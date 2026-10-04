import { useState } from 'preact/hooks';
import type { ExerciseController } from '../services/exercise-controller';
import { ChallengeStub } from '../components/ChallengeStub';

const difficulties = [
  { value: 'any', label: 'Any level' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export function HomePage({ controller, onStartTrack }: { controller: ExerciseController; onStartTrack: (language: string, difficulty: string) => void }) {
  const languages = controller.listLanguages();
  const [language, setLanguage] = useState(languages.includes('typescript') ? 'typescript' : languages[0] ?? '');
  const [difficulty, setDifficulty] = useState('tutorial');
  const [specificMode, setSpecificMode] = useState(false);
  const matching = controller.listExercisesForLanguage(language).filter((exercise) =>
    difficulty === 'any' || exercise.item.difficulty === difficulty
  );
  const exercisesByDifficulty = difficulties
    .filter(({ value }) => value !== 'any')
    .map(({ value, label }) => ({
      value,
      label,
      exercises: matching.filter(({ item }) => item.difficulty === value),
    }))
    .filter(({ exercises }) => exercises.length > 0);

  return <main class="launchpad">
    <h1>Clear your change for <em>launch.</em></h1>
    <p class="intro">Review a proposed pull request, consider the mission brief, and make the call. Will it fly?</p>

    <section class="practice-setup" aria-labelledby="practice-heading">
      <div>
        <p class="section-label">START A PRACTICE SET</p>
        <h2 id="practice-heading">Choose your flight plan</h2>
        <p class="filter-hint">Pick a language and level. We’ll deal you an exercise to review.</p>
      </div>
      <div class="setup-fields">
        <label class="setup-field">LANGUAGE
          <select value={language} onChange={(event) => setLanguage((event.currentTarget as HTMLSelectElement).value)}>
            {languages.map((item) => {
              const label = item === 'typescript' ? 'TypeScript' : item === 'python' ? 'Python' : item === 'java' ? 'Java' : item.toUpperCase();
              return <option value={item} key={item}>{label}</option>;
            })}
          </select>
        </label>
        <label class="setup-field">DIFFICULTY
          <select value={difficulty} onChange={(event) => setDifficulty((event.currentTarget as HTMLSelectElement).value)}>
            {difficulties.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
          </select>
        </label>
      </div>
      <button class="primary-action" type="button" disabled={!matching.length} onClick={() => onStartTrack(language, difficulty)}>Start exercise track <span>→</span></button>
      <p class="set-count">{matching.length} {matching.length === 1 ? 'exercise' : 'exercises'} in this set</p>
    </section>

    <section class="specific-picker">
      <button class="specific-toggle" type="button" aria-expanded={specificMode} onClick={() => setSpecificMode(!specificMode)}>
        {specificMode ? 'Hide' : 'Choose'} a specific exercise <span>{specificMode ? '−' : '+'}</span>
      </button>
      {specificMode && <div class="specific-list">
        {exercisesByDifficulty.map(({ value, label, exercises }) => <section class="tutorial-levels" aria-label={`${label} exercises`} key={value}>
          <p class="section-label">{label.toUpperCase()}</p>
          {exercises.map((exercise) => <ChallengeStub exercise={exercise} key={`${exercise.slug}-${exercise.language}`} />)}
        </section>)}
        {matching.length === 0 && <p class="filter-hint">No exercises match this language and difficulty yet.</p>}
      </div>}
    </section>

    <section class="briefing">
      <article><b>01</b><h2>Read the ticket</h2><p>Understand the requested change and its constraints.</p></article>
      <article><b>02</b><h2>Inspect the PR</h2><p>Trace what the code actually changes.</p></article>
      <article><b>03</b><h2>Make the call</h2><p>Approve a safe launch or deny a risky one.</p></article>
    </section>
  </main>;
}
