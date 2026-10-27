import { useEffect, useState } from 'preact/hooks';
import { AiReview } from '../components/AiReview';
import { DiffView, type DiffOutputFormat } from '../components/DiffView';
import { TrackNavigator } from '../components/TrackNavigator';
import { Choice, type ExercisePackage } from '../types/StandardTypes'

function prettyPrintChoice(answer: Choice) {
  return answer === Choice.ACCEPT ? 'Approve' : 'Deny';
}


export function ReviewPage({ exercise, previousHref, nextHref, trackProgressLabel, completed = false, menuHash = 'home', onComplete }: { exercise: ExercisePackage; previousHref?: string; nextHref?: string; trackProgressLabel?: string; completed?: boolean; menuHash?: string; onComplete?: () => void }) {
  const [format, setFormat] = useState<DiffOutputFormat>(() => window.matchMedia('(max-width: 760px)').matches ? 'line-by-line' : 'side-by-side');
  const [contextSize, setContextSize] = useState<number>(10);
  const [highlight, setHighlight] = useState<boolean>(true);
  const [submittedChoice, setSubmittedChoice] = useState<Choice | null>(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { item, changedFiles } = exercise;
  const recommendation = item.proposedAnswer;
  const submitChoice = (choice: Choice) => {
    setSubmittedChoice(choice);
    onComplete?.();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [exercise.slug, exercise.language]);

  useEffect(() => {
    if (!toolsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setToolsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [toolsOpen]);

  const navigateWithinReview = (id: string) => {
    setToolsOpen(false);
    requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (!section) return;

      let expandableSection: HTMLElement | null = section;
      while (expandableSection) {
        if (expandableSection instanceof HTMLDetailsElement) expandableSection.open = true;
        expandableSection = expandableSection.parentElement;
      }

      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return <>
    <main class={`review-page${trackProgressLabel ? ' review-page--with-navigation' : ''}`}>
      {trackProgressLabel && <div class="review-navigation">
        <TrackNavigator
          variant="review"
          previous={previousHref ? { href: `#${previousHref}` } : undefined}
          next={nextHref ? { href: `#${nextHref}` } : undefined}
          progressLabel={trackProgressLabel}
        />
      </div>}
      <button class="review-tools-trigger" type="button" aria-expanded={toolsOpen} aria-controls="review-tools-panel" onClick={() => setToolsOpen(true)}>Review tools</button>
      <section class="review-heading">
        <div>
          <p class="eyebrow">EXERCISE {item.id} · {item.difficulty.toUpperCase()}</p>
          <h1>{item.pr.title}</h1>
          <p class="byline">{item.pr.author} proposes merging <code>{item.pr.sourceBranch}</code> into <code>{item.pr.targetBranch}</code>
          </p>
        </div>
      </section>
      <section class="review-content">
        <details id="review-ticket" class="context-panel ticket" open>
          <summary>
            <span>
              <span class="section-label">TRACKING TICKET</span>
              <strong>{item.ticket.title}</strong>
            </span>
            <span class="panel-toggle" aria-hidden="true">Hide ticket</span>
          </summary>
          <div class="panel-content">
            <p>{item.ticket.description}</p>
            <h3>Requirements</h3>
            <ul>
              {item.ticket.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
          </div>
        </details>
        <section id="review-changes" class="pull-request">
          <div class="pr-summary">
            <div>
              <p class="section-label">PROPOSED PULL REQUEST</p>
              <p>{item.pr.description}</p>
            </div>
            <span class="files-changed">{changedFiles.length} file changed · {exercise.language}</span>
          </div>
          <DiffView exercise={exercise} 
            format={format} onFormatChange={setFormat} 
            contextSize={contextSize} onContextSizeChange={setContextSize}
            highlight={highlight} onHighlightChange={setHighlight}
          />
          <AiReview id="review-ai" review={item.aiReview} />
          <div id="review-decision" class="decision">
            <div>
              <strong>What’s your recommendation?</strong>
              <span>Choose the action you would take, then compare it with the exercise guidance.</span>
              <ul class="decision-checklist" aria-label="Before deciding, verify">
                <li>Intent: does the change satisfy the ticket?</li>
                <li>Impact: does the diff introduce a bug or security risk?</li>
                <li>Evidence: did you verify any automated findings yourself?</li>
              </ul>
            </div>
            <div class="decision-buttons">
              <button class="deny" type="button" onClick={() => submitChoice(Choice.REJECT)}>Deny</button>
              <button class="approve" type="button" onClick={() => submitChoice(Choice.ACCEPT)}>Approve</button>
            </div>
          </div>
        </section>
      </section>
    </main>
    {toolsOpen && <div class="review-tools-backdrop" onClick={() => setToolsOpen(false)}>
      <aside id="review-tools-panel" class="review-tools-panel" role="dialog" aria-modal="true" aria-label="Review tools" onClick={(event) => event.stopPropagation()}>
        <div class="review-tools-heading">
          <div>
            <p class="section-label">REVIEW TOOLS</p>
            <strong>Navigate your review</strong>
          </div>
          <button class="review-tools-close" type="button" aria-label="Close review tools" onClick={() => setToolsOpen(false)}>×</button>
        </div>
        <nav class="review-tools-nav" aria-label="Review sections">
          <button type="button" onClick={() => navigateWithinReview('review-ticket')}>Ticket &amp; requirements</button>
          <button type="button" onClick={() => navigateWithinReview('review-changes')}>Changed code</button>
          <button type="button" onClick={() => navigateWithinReview('review-ai')}>Automated review</button>
          <button type="button" onClick={() => navigateWithinReview('review-decision')}>Your decision</button>
        </nav>
        <section class="review-file-list" aria-labelledby="review-files-title">
          <p id="review-files-title" class="section-label">CHANGED FILES · {changedFiles.length}</p>
          <ul>
            {changedFiles.map((file, index) => <li key={file.path}><button type="button" onClick={() => navigateWithinReview(`review-file-${index}`)}><code>{file.path}</code></button></li>)}
          </ul>
        </section>
      </aside>
    </div>}
    {submittedChoice !== null && <div class="comparison-backdrop" onClick={() => setSubmittedChoice(null)}>
      <section class="comparison-dialog" role="dialog" aria-modal="true" aria-labelledby="comparison-title" onClick={(event) => event.stopPropagation()}>
        <button class="comparison-close" type="button" aria-label="Close comparison" onClick={() => setSubmittedChoice(null)}>×</button>
        <p class="eyebrow">REVIEW COMPARISON</p>
        <h2 id="comparison-title">Your call: {prettyPrintChoice(submittedChoice)}</h2>
        {recommendation ? <>
          <div class="comparison-recommendation">
            <span>Exercise recommendation</span>
            <strong>{prettyPrintChoice(recommendation.answer)}</strong>
          </div>
          <h3>Why we recommend this</h3>
          <p>{recommendation.reason}</p>
        </> : <p>There is no exercise recommendation available for this change.</p>}
        <p class="comparison-note">Use the reasoning to compare approaches. This practice is for learning, not grading.</p>
        <div class="comparison-actions">
          <button class="comparison-done secondary" type="button" onClick={() => {
            setSubmittedChoice(null);
            window.location.hash = previousHref ?? menuHash;
          }}>{previousHref ? 'Return to previous story page' : 'Return to main menu'}</button>
          {nextHref && <button class="comparison-done" type="button" onClick={() => { window.location.hash = nextHref; }}>Next <span aria-hidden="true">→</span></button>}
          {completed && <p class="track-complete" role="status">Track complete — you reviewed every exercise in this set.</p>}
          {completed && <button class="comparison-done" type="button" onClick={() => { window.location.hash = menuHash; }}>{menuHash === 'story' ? 'Finish mission' : 'Return to exercise menu'} <span aria-hidden="true">→</span></button>}
          <button class="review-again" type="button" onClick={() => setSubmittedChoice(null)}>Back to review</button>
        </div>
      </section>
    </div>}
  </>;
}
