import { CachedAiReview } from "../types/StandardTypes";

export function AiReview({ review }: { review: CachedAiReview }) {
  return <details class="context-panel ai-review">
    <summary>
      <span>
        <span class="section-label">APE INPUT™ CODE REVIEW</span>
        <strong>Run automated review</strong>
      </span>
      <span class="panel-toggle" aria-hidden="true">Show review</span>
    </summary>
    <div class="panel-content">
      <p class="ai-disclaimer">
        Automated analysis can help focus your review. Treat it as a starting point: check the diff and ticket yourself, then make the shipping decision.
      </p>
      <h3 class="ai-focus-label">A place to focus</h3>
      <p class="ai-summary">{review.summary}</p>
      {review.findings.length > 0 && <>
        <h3 class="ai-focus-label">Things to inspect</h3>
        <ul class="ai-findings">{review.findings.map((finding) => <li key={`${finding.file ?? ''}-${finding.title}`}><div><strong>{finding.title}</strong>{finding.file && <code>{finding.file}</code>}<p>{finding.detail}</p></div></li>)}</ul>
      </>}
    </div>
  </details>;
}
