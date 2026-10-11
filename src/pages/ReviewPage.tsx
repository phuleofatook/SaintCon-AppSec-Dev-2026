import { useEffect, useState } from 'preact/hooks';
import { AiReview } from '../components/AiReview';
import { DiffView, type DiffOutputFormat } from '../components/DiffView';
import { Choice, type ExercisePackage } from '../types/StandardTypes'

function prettyPrintChoice(answer: Choice) {
  return answer === Choice.ACCEPT ? 'Approve' : 'Deny';
}


export function ReviewPage({ exercise, previousHref, nextExercise, nextHref, progress, completed = false, menuHash = 'home' }: { exercise: ExercisePackage; previousHref?: string; nextExercise?: ExercisePackage; nextHref?: string; progress?: { current: number; total: number }; completed?: boolean; menuHash?: string }) {
  const [format, setFormat] = useState<DiffOutputFormat>('side-by-side');
  const [contextSize, setContextSize] = useState<number>(10);
  const [highlight, setHighlight] = useState<boolean>(true);
  const [submittedChoice, setSubmittedChoice] = useState<Choice | null>(null);
  const { item, changedFiles } = exercise;
  const recommendation = item.proposedAnswer;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [exercise.slug, exercise.language]);

  return <>
    <main class="review-page">
      <div class="review-navigation">
        <a class="back" href={`#${menuHash}`}>Back to main menu</a>
        {previousHref && <a class="track-page-link" href={`#${previousHref}`}>&larr; Previous page</a>}
        {nextHref && <a class="track-page-link" href={`#${nextHref}`}>Next page &rarr;</a>}
      </div>
      <section class="review-heading">
        <div>
          <p class="eyebrow">{progress ? `TRACK EXERCISE ${progress.current}/${progress.total} · ` : 'EXERCISE '}{item.id} · {item.difficulty.toUpperCase()}</p>
          <h1>{item.pr.title}</h1>
          <p class="byline">{item.pr.author} proposes merging <code>{item.pr.sourceBranch}</code> into <code>{item.pr.targetBranch}</code>
          </p>
        </div>
      </section>
      <section class="review-content">
        <details class="context-panel ticket" open>
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
        <section class="pull-request">
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
          <AiReview review={item.aiReview} />
          <div class="decision">
            <div>
              <strong>What’s your recommendation?</strong>
              <span>Choose the action you would take, then compare it with the exercise guidance.</span>
            </div>
            <div class="decision-buttons">
              <button class="deny" type="button" onClick={() => setSubmittedChoice(Choice.REJECT)}>Deny</button>
              <button class="approve" type="button" onClick={() => setSubmittedChoice(Choice.ACCEPT)}>Approve</button>
            </div>
          </div>
        </section>
      </section>
    </main>
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
          {nextHref && <button class="comparison-done" type="button" onClick={() => { window.location.hash = nextHref; }}>{nextExercise ? 'Do next exercise' : 'Continue story'} <span aria-hidden="true">→</span></button>}
          {completed && <p class="track-complete" role="status">Track complete — you reviewed every exercise in this set.</p>}
          <button class="review-again" type="button" onClick={() => setSubmittedChoice(null)}>Back to review</button>
        </div>
      </section>
    </div>}
  </>;
}
