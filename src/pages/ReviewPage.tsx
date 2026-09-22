import { useState } from 'preact/hooks';
import { AiReview } from '../components/AiReview';
import { DiffView, type DiffOutputFormat } from '../components/DiffView';
import type { Choice } from '../types/StandardTypes'
import type { ExercisePackage } from '../types/StandardTypes'

function score(choice: Choice, exercise: ExercisePackage) {

  if (!exercise.item.proposedAnswer){
    console.warn(`This excersize does not have a proposed answer`);
    return;
  }

  console.log(`The user chose ${choice} and the recommended solution was ${exercise.item.proposedAnswer.answer}`);
  if (choice !== exercise.item.proposedAnswer.answer) {

    //TODO: make this a nice modal rather than a plain alert. OR make an in page feedback
    alert(`We recommend ${prettyPrintChoice(exercise.item.proposedAnswer.answer)} for this reason: ${exercise.item.proposedAnswer.reason}`);
  }

  function prettyPrintChoice(answer:any) {
    switch (answer) {
      case Choice.ACCEPT: return 'Approve';
      case Choice.REJECT: return 'Deny';
      case Choice.MAYBE: return 'Maybe';
    }

    console.warn(`Unable to pretty print ${answer}`);
    return answer;
  }
}


export function ReviewPage({ exercise }: { exercise: ExercisePackage }) {
  const [format, setFormat] = useState<DiffOutputFormat>('side-by-side');
  const [contextSize, setContextSize] = useState<number>(10);
  const { item, changedFiles } = exercise;

  return <>
    <main class="review-page">
      <a class="back" href="#home">← Challenge queue</a>
      <section class="review-heading">
        <div>
          <p class="eyebrow">EXERCISE {item.id} · {item.difficulty.toUpperCase()}</p>
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
              <h2>{item.pr.title}</h2>
              <p>{item.pr.description}</p>
            </div>
            <span class="files-changed">{changedFiles.length} file changed · {item.defaultLanguage}</span>
          </div>
          <AiReview review={item.aiReview} />
          <DiffView exercise={exercise} 
            format={format} onFormatChange={setFormat} 
            contextSize={contextSize} onContextSizeChange={setContextSize}
          />
          <div class="decision">
            <div>
              <strong>Ready to make the call?</strong>
              <span>Approve changes that should ship. Deny changes that should not.</span>
            </div>
            <div class="decision-buttons">
              <button class="deny" type="button" onClick={() => score(Choice.DENY, exercise)}>Deny</button>
              {item.difficulty === 'hard' ? <button class="maybe" type="button" onClick={() => score(Choice.MAYBE, exercise)}>Maybe</button> : ''}
              <button class="approve" type="button" onClick={() => score(Choice.ACCEPT, exercise)}>Approve</button>
            </div>
          </div>
        </section>
      </section>
    </main>
  </>;
}
