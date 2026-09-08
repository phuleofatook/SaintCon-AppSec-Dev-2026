import { Diff2HtmlUI } from 'diff2html/lib-esm/ui/js/diff2html-ui-slim';
import { createTwoFilesPatch } from 'diff';
import 'diff2html/bundles/css/diff2html.min.css';
import { ExerciseController, type CachedAiReview, type ExercisePackage } from './exercise-controller';
import './styles.css';
import './ai-review.css';

const app = document.querySelector<HTMLDivElement>('#app');
const controller = new ExerciseController();
let diffOutputFormat: 'side-by-side' | 'line-by-line' = 'side-by-side';
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&gt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]!);
const shell = (content: string) => `<header class="site-header">
  <a href="#home" class="brand"><span>✦</span> SAINTCON <small>SPACEWAYS · FLIGHT 26</small></a>
  <span class="track">APPSEC DEVELOPER TRACK</span>
</header>
${content}`;
const aiReviewMarkup = (review: CachedAiReview) => {
  const findings = review.findings.length
    ? `<ul class="ai-findings">${review.findings.map((finding) => `<li><span class="severity severity-${finding.severity}">${escapeHtml(finding.severity)}</span><div><strong>${escapeHtml(finding.title)}</strong>${finding.file ? `<code>${escapeHtml(finding.file)}</code>` : ''}<p>${escapeHtml(finding.detail)}</p></div></li>`).join('')}</ul>`
    : '<p class="ai-empty">No issues found in this change.</p>';
  const decision = review.verdict === 'approve' ? 'Approve' : 'Deny';
  return `<details class="context-panel ai-review">
  <summary>
  <span>
  <span class="section-label">OFFLINE AI REVIEW</span>
  <strong>Cached review assistant</strong></span>
  <span class="panel-toggle" aria-hidden="true">Show review</span></summary><div class="panel-content"><p class="ai-disclaimer">Precomputed for this exercise. It does not send your code or use tokens.</p><div class="ai-verdict ai-verdict-${review.verdict}"><span>Suggested decision</span><strong>${decision}</strong></div><p class="ai-summary">${escapeHtml(review.summary)}</p>${findings}</div></details>`;
};

function renderHome() {
  if (!app) return;
  const exercises = controller.listExercises();
  const levels = exercises.map(({ slug, item }) => `<a href="#review/${slug}"><b>${escapeHtml(item.id)}</b><span>${escapeHtml(item.pr.title)}</span><small>${escapeHtml(item.difficulty)}</small></a>`).join('');
  const firstExercise = exercises[0];
  app.innerHTML = shell(`
    <main class="launchpad">
      <p class="eyebrow">DEVELOPER TRACK</p>
      <h1>Clear your change<br>for <em>launch.</em></h1>
      <p class="intro">
        Review a proposed pull request, consider the mission brief, and make the call. 
        Will it fly?
      </p>
      ${firstExercise ? `<a class="primary-action" href="#review/${firstExercise.slug}">Begin a review <span>→</span></a>` : ''}
      <p class="hint">One ticket. One pull request. Your decision.</p>
      <section class="tutorial-levels" aria-label="Tutorial levels">
        <p class="section-label">TUTORIAL LEVELS</p>
        ${levels}
      </section>
      <section class="briefing">
        <article><b>01</b><h2>Read the ticket</h2><p>Understand the requested change and its constraints.</p></article>
        <article><b>02</b><h2>Inspect the PR</h2><p>Trace what the code actually changes.</p></article>
        <article><b>03</b><h2>Make the call</h2><p>Approve a safe launch or deny a risky one.</p></article>
      </section>
    </main>
    `);
}

function renderReview(exercise: ExercisePackage) {
  if (!app) return;
  const { item, changedFiles } = exercise;
  const exerciseDiff = changedFiles.map((file) => createTwoFilesPatch(file.path, file.path, file.before, file.after, '', '', { context: 3 })).join('\n');
  app.innerHTML = shell(`
    <main class="review-page">
      <a class="back" href="#home">← Challenge queue</a>
      <section class="review-heading">
        <div>
          <p class="eyebrow">EXERCISE ${escapeHtml(item.id)} · ${escapeHtml(item.difficulty.toUpperCase())}</p>
          <h1>${escapeHtml(item.pr.title)}</h1>
          <p class="byline">
            ${escapeHtml(item.pr.author)} proposes merging <code>${escapeHtml(item.pr.sourceBranch)}</code> into <code>${escapeHtml(item.pr.targetBranch)}</code>
          </p>
        </div>
        <span class="open-status">● Open</span>
      </section>
      <section class="review-content">
        <details class="context-panel ticket" open>
          <summary>
            <span>
              <span class="section-label">TRACKING TICKET</span>
              <strong>${escapeHtml(item.ticket.title)}</strong>
            </span>
            <span class="panel-toggle" aria-hidden="true">Hide ticket</span>
          </summary>
          <div class="panel-content">
            <p>${escapeHtml(item.ticket.description)}</p>
            <h3>Requirements</h3>
            <ul>
              ${item.ticket.requirements.map((requirement) => `<li>${escapeHtml(requirement)}</li>`).join('')}
            </ul>
          </div>
        </details>
      <section class="pull-request">
          <div class="pr-summary">
            <div>
              <p class="section-label">PROPOSED PULL REQUEST</p>
              <h2>${escapeHtml(item.pr.title)}</h2>
              <p>${escapeHtml(item.pr.description)}</p>
            </div>
            <span class="files-changed">${changedFiles.length} file changed · ${escapeHtml(item.defaultLanguage)}</span></div>${aiReviewMarkup(item.aiReview)}<div id="diff" aria-label="Proposed code changes"></div>
            <div class="decision"><div>
            <strong>Ready to make the call?</strong>
            <span>Approve changes that should ship. Deny changes that should not.</span></div>
            <div class="decision-buttons">
            <button class="deny" type="button">Deny</button>
            <button class="approve" type="button">Approve</button>
            </div>
          </div>
        </section>
      </section>
    </main>`);
  const target = document.querySelector<HTMLElement>('#diff');
  if (!target) return;
  target.insertAdjacentHTML('beforebegin', `<div class="diff-toolbar" aria-label="Diff output format"><span class="section-label">OUTPUT FORMAT</span><div class="format-switch" role="group"><button type="button" data-diff-format="side-by-side" aria-pressed="${diffOutputFormat === 'side-by-side'}">Side by side</button><button type="button" data-diff-format="line-by-line" aria-pressed="${diffOutputFormat === 'line-by-line'}">Line by line</button></div></div>`);
  const drawDiff = () => {
    target.innerHTML = '';
    new Diff2HtmlUI(target, exerciseDiff, { drawFileList: false, outputFormat: diffOutputFormat, matching: 'words' }).draw();
  };
  drawDiff();
  document.querySelectorAll<HTMLButtonElement>('[data-diff-format]').forEach((button) => {
    button.addEventListener('click', () => {
      const format = button.dataset.diffFormat;
      if (format !== 'side-by-side' && format !== 'line-by-line') return;
      diffOutputFormat = format;
      document.querySelectorAll<HTMLButtonElement>('[data-diff-format]').forEach((control) => {
        control.setAttribute('aria-pressed', String(control.dataset.diffFormat === diffOutputFormat));
      });
      drawDiff();
    });
  });
}

function render() {
  const slug = window.location.hash.match(/^#review\/([^/]+)$/)?.[1];
  const exercise = slug ? controller.selectExercise(slug) : undefined;
  if (exercise) renderReview(exercise);
  else renderHome();
}

window.addEventListener('hashchange', render);
render();
