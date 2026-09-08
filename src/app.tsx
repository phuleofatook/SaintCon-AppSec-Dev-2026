import type { ComponentChildren } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Diff2HtmlUI } from 'diff2html/lib-esm/ui/js/diff2html-ui-slim';
import { createTwoFilesPatch } from 'diff';
import { ExerciseController, type CachedAiReview, type ExercisePackage } from './exercise-controller';

type DiffOutputFormat = 'side-by-side' | 'line-by-line';

function Header() {
  return <header class="site-header"><a href="#home" class="brand"><span>✦</span> SAINTCON <small>SPACEWAYS · FLIGHT 26</small></a><span class="track">APPSEC DEVELOPER TRACK</span></header>;
}

function Shell({ children }: { children: ComponentChildren }) { return <><Header />{children}</>; }

function AiReview({ review }: { review: CachedAiReview }) {
  const decision = review.verdict === 'approve' ? 'Approve' : 'Deny';
  return <details class="context-panel ai-review"><summary><span><span class="section-label">OFFLINE AI REVIEW</span><strong>Cached review assistant</strong></span><span class="panel-toggle" aria-hidden="true">Show review</span></summary><div class="panel-content"><p class="ai-disclaimer">Precomputed for this exercise. It does not send your code or use tokens.</p><div class={`ai-verdict ai-verdict-${review.verdict}`}><span>Suggested decision</span><strong>{decision}</strong></div><p class="ai-summary">{review.summary}</p>{review.findings.length ? <ul class="ai-findings">{review.findings.map((finding) => <li key={`${finding.file ?? ''}-${finding.title}`}><span class={`severity severity-${finding.severity}`}>{finding.severity}</span><div><strong>{finding.title}</strong>{finding.file && <code>{finding.file}</code>}<p>{finding.detail}</p></div></li>)}</ul> : <p class="ai-empty">No issues found in this change.</p>}</div></details>;
}

function HomePage({ controller }: { controller: ExerciseController }) {
  const exercises = controller.listExercises();
  const firstExercise = exercises[0];
  return <Shell><main class="launchpad"><p class="eyebrow">DEVELOPER TRACK</p><h1>Clear your change<br />for <em>launch.</em></h1><p class="intro">Review a proposed pull request, consider the mission brief, and make the call. Will it fly?</p>{firstExercise && <a class="primary-action" href={`#review/${firstExercise.slug}`}>Begin a review <span>→</span></a>}<p class="hint">One ticket. One pull request. Your decision.</p><section class="tutorial-levels" aria-label="Tutorial levels"><p class="section-label">TUTORIAL LEVELS</p>{exercises.map(({ slug, item }) => <a href={`#review/${slug}`} key={slug}><b>{item.id}</b><span>{item.pr.title}</span><small>{item.difficulty}</small></a>)}</section><section class="briefing"><article><b>01</b><h2>Read the ticket</h2><p>Understand the requested change and its constraints.</p></article><article><b>02</b><h2>Inspect the PR</h2><p>Trace what the code actually changes.</p></article><article><b>03</b><h2>Make the call</h2><p>Approve a safe launch or deny a risky one.</p></article></section></main></Shell>;
}

function DiffView({ exercise, format, onFormatChange }: { exercise: ExercisePackage; format: DiffOutputFormat; onFormatChange: (format: DiffOutputFormat) => void }) {
  const target = useRef<HTMLDivElement>(null);
  const exerciseDiff = exercise.changedFiles.map((file) => createTwoFilesPatch(file.path, file.path, file.before, file.after, '', '', { context: 3 })).join('\n');
  useEffect(() => { if (!target.current) return; target.current.innerHTML = ''; new Diff2HtmlUI(target.current, exerciseDiff, { drawFileList: false, outputFormat: format, matching: 'words' }).draw(); }, [exerciseDiff, format]);
  return <><div class="diff-toolbar" aria-label="Diff output format"><span class="section-label">OUTPUT FORMAT</span><div class="format-switch" role="group"><button type="button" aria-pressed={format === 'side-by-side'} onClick={() => onFormatChange('side-by-side')}>Side by side</button><button type="button" aria-pressed={format === 'line-by-line'} onClick={() => onFormatChange('line-by-line')}>Line by line</button></div></div><div ref={target} aria-label="Proposed code changes" /></>;
}

function ReviewPage({ exercise }: { exercise: ExercisePackage }) {
  const [format, setFormat] = useState<DiffOutputFormat>('side-by-side');
  const { item, changedFiles } = exercise;
  return <Shell><main class="review-page"><a class="back" href="#home">← Challenge queue</a><section class="review-heading"><div><p class="eyebrow">EXERCISE {item.id} · {item.difficulty.toUpperCase()}</p><h1>{item.pr.title}</h1><p class="byline">{item.pr.author} proposes merging <code>{item.pr.sourceBranch}</code> into <code>{item.pr.targetBranch}</code></p></div><span class="open-status">● Open</span></section><section class="review-content"><details class="context-panel ticket" open><summary><span><span class="section-label">TRACKING TICKET</span><strong>{item.ticket.title}</strong></span><span class="panel-toggle" aria-hidden="true">Hide ticket</span></summary><div class="panel-content"><p>{item.ticket.description}</p><h3>Requirements</h3><ul>{item.ticket.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul></div></details><section class="pull-request"><div class="pr-summary"><div><p class="section-label">PROPOSED PULL REQUEST</p><h2>{item.pr.title}</h2><p>{item.pr.description}</p></div><span class="files-changed">{changedFiles.length} file changed · {item.defaultLanguage}</span></div><AiReview review={item.aiReview} /><DiffView exercise={exercise} format={format} onFormatChange={setFormat} /><div class="decision"><div><strong>Ready to make the call?</strong><span>Approve changes that should ship. Deny changes that should not.</span></div><div class="decision-buttons"><button class="deny" type="button">Deny</button><button class="approve" type="button">Approve</button></div></div></section></section></main></Shell>;
}

export function App() {
  const controllerRef = useRef(new ExerciseController());
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => { const onHashChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange); }, []);
  const slug = hash.match(/^#review\/([^/]+)$/)?.[1];
  const exercise = slug ? controllerRef.current.selectExercise(slug) : undefined;
  return exercise ? <ReviewPage exercise={exercise} /> : <HomePage controller={controllerRef.current} />;
}
