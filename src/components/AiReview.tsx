import type { CachedAiReview } from '../services/exercise-controller';

export function AiReview({ review }: { review: CachedAiReview }) {
  const decision = review.verdict === 'approve' ? 'Approve' : 'Deny';
  return <details class="context-panel ai-review">
    <summary>
      <span>
        <span class="section-label">OFFLINE AI REVIEW</span>
        <strong>Review assistant</strong>
      </span>
      <span class="panel-toggle" aria-hidden="true">Show review</span>
    </summary>
    <div class="panel-content">
      <p class="ai-disclaimer">Precomputed for this exercise. It does not send your code or use tokens.</p>
      <div class={`ai-verdict ai-verdict-${review.verdict}`}>
        <span>Suggested decision</span>
        <strong>{decision}</strong>
      </div>
      <p class="ai-summary">{review.summary}</p>
      {review.findings.length ? <ul class="ai-findings">{review.findings.map((finding) => <li key={`${finding.file ?? ''}-${finding.title}`}><span class={`severity severity-${finding.severity}`}>{finding.severity}</span><div><strong>{finding.title}</strong>{finding.file && <code>{finding.file}</code>}<p>{finding.detail}</p></div></li>)}</ul> : <p class="ai-empty">No issues found in this change.</p>}
    </div>
  </details>;
}
