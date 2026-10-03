import { ChallengeStub } from '../components/ChallengeStub';
import type { ExerciseController } from '../services/exercise-controller';
import { useState } from 'preact/hooks';

export function HomePage({ controller }: { controller: ExerciseController }) {
  const languages = controller.listLanguages();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const exercises = controller.listExercisesForLanguages(selectedLanguages);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((selected) => selected.includes(language)
      ? selected.filter((selectedLanguage) => selectedLanguage !== language)
      : [...selected, language]);
  };

  return <>
    <main class="launchpad">
      <h1>Clear your change<br />for <em>launch.</em></h1>
      <p class="intro">Review a proposed pull request, consider the mission brief, and make the call. Will it fly?</p>


      {
/*
      //TODO: make this a random list rather than a hard coded specific one
      firstExercise && <a class="primary-action" href={`#review/${firstExercise.slug}`}>Begin a review <span>→</span></a>
  */
      }
      


      <section class="language-filter" aria-labelledby="language-filter-heading">
        <div>
          <p class="section-label" id="language-filter-heading">FILTER BY LANGUAGE</p>
          <p class="filter-hint">Select one or more languages. Exercises matching any selection are shown.</p>
        </div>
        <div class="language-options">
          {languages.map((language) => (
            <label class="language-option" key={language}>
              <input type="checkbox" checked={selectedLanguages.includes(language)} onChange={() => toggleLanguage(language)} />
              <span>{language}</span>
            </label>
          ))}
        </div>
        {selectedLanguages.length > 0 && <button class="clear-filter" type="button" onClick={() => setSelectedLanguages([])}>Clear filter</button>}
      </section>

      <section class="tutorial-levels" aria-label="Tutorial levels">
        <p class="section-label">TUTORIAL LEVELS</p>
        {exercises.filter((exercise) => exercise.item.difficulty === 'tutorial').map((exercise) => <ChallengeStub exercise={exercise} key={exercise.slug}/>)}
      </section>

{
//This is just a quick picker for testing.  Possibly in the future it could be a legit entry point (specific one vs random set)
}
      <section class="tutorial-levels" aria-label="Tutorial levels">
        <p class="section-label">Specific Challenges</p>
        {exercises.filter((exercise) => exercise.item.difficulty !== 'tutorial').map((exercise) => <ChallengeStub exercise={exercise} key={exercise.slug}/>)}
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
