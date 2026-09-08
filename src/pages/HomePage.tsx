import { ChallengeStub } from '../components/ChallengeStub';
import type { ExerciseController } from '../exercise-controller';

export function HomePage({ controller }: { controller: ExerciseController }) {
  const exercises = controller.listExercises();
  const firstExercise = exercises[0];
  return <>
    <main class="launchpad">
      <h1>Clear your change<br />for <em>launch.</em></h1>
      <p class="intro">Review a proposed pull request, consider the mission brief, and make the call. Will it fly?</p>

      {firstExercise && <a class="primary-action" href={`#review/${firstExercise.slug}`}>Begin a review <span>→</span></a>}

      <p class="hint">One ticket. One pull request. Your decision.</p>
      <section class="tutorial-levels" aria-label="Tutorial levels">
        <p class="section-label">TUTORIAL LEVELS</p>
        {exercises.map((exercise) => <ChallengeStub exercise={exercise}/>)}
      </section>
      <section class="briefing">
        <article>
          <b>01</b>
          <h2>Read the ticket</h2>
          <p>Understand the requested change and its constraints.</p>
        </article>
        <article>
          <b>02</b>
          <h2>Inspect the PR</h2>
          <p>Trace what the code actually changes.</p>
        </article>
        <article>
          <b>03</b>
          <h2>Make the call</h2>
          <p>Approve a safe launch or deny a risky one.</p>
        </article>
      </section>
    </main>
  </>;
}
