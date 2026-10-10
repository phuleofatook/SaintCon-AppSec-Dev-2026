import { useState } from 'preact/hooks';
import type { ExerciseController } from '../services/exercise-controller';
import { ChallengeStub } from '../components/ChallengeStub';

const difficulties = [
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export function HomePage({ controller, onStartTrack }: { controller: ExerciseController; onStartTrack: (language: string, difficulties: readonly string[]) => void }) {
  const languages = controller.listLanguages();
  const [language, setLanguage] = useState(languages.includes('typescript') ? 'typescript' : languages[0] ?? '');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((current) => current.includes(difficulty)
      ? current.filter((value) => value !== difficulty)
      : [...current, difficulty]);
  };
  const matching = controller.listExercisesForLanguage(language).filter((exercise) =>
    selectedDifficulties.length === 0 || selectedDifficulties.includes(exercise.item.difficulty)
  );
  const exercisesByDifficulty = difficulties
    .map(({ value, label }) => ({
      value,
      label,
      exercises: matching.filter(({ item }) => item.difficulty === value),
    }))
    .filter(({ exercises }) => exercises.length > 0);

  return <main class="launchpad">
    <a class="back" href="#home">Back to title</a>
    <p class="eyebrow">FREE FOR ALL</p>
    <h1>Clear your change for <em>launch.</em></h1>
    <p class="intro">Review a proposed pull request, consider the mission brief, and make the call. Will it fly?</p>

    <section class="exercise-filters" aria-labelledby="filter-heading">
      <div class="filter-intro">
        <p class="section-label">FILTER EXERCISES</p>
        <h2 id="filter-heading">Set your review parameters</h2>
        <p class="filter-hint">These filters apply to both a practice track and the individual exercise list below.</p>
      </div>
      <div class="filter-controls">
        <label class="setup-field">LANGUAGE
          <select value={language} onChange={(event) => setLanguage((event.currentTarget as HTMLSelectElement).value)}>
            {languages.map((item) => {
              const label = item === 'typescript' ? 'TypeScript' : item === 'python' ? 'Python' : item === 'java' ? 'Java' : item.toUpperCase();
              return <option value={item} key={item}>{label}</option>;
            })}
          </select>
        </label>
        <fieldset class="difficulty-filter">
          <legend>DIFFICULTY <span>Optional — clear means any level</span></legend>
          <div class="difficulty-options">
            {difficulties.map((item) => <label class="difficulty-option" key={item.value}>
              <input type="checkbox" checked={selectedDifficulties.includes(item.value)} onChange={() => toggleDifficulty(item.value)} />
              <span>{item.label}</span>
            </label>)}
          </div>
        </fieldset>
      </div>
    </section>

    <div class="exercise-paths">
      <section class="practice-setup" aria-labelledby="practice-heading">
        <div>
          <p class="section-label">PRACTICE SET</p>
          <h2 id="practice-heading">Take a randomized track</h2>
          <p class="filter-hint">We’ll shuffle the matching exercises into a review queue.</p>
        </div>
        <div class="practice-action">
          <button class="primary-action" type="button" disabled={!matching.length} onClick={() => onStartTrack(language, selectedDifficulties)}>Start exercise track <span>→</span></button>
          <p class="set-count">{matching.length} {matching.length === 1 ? 'exercise' : 'exercises'} available</p>
        </div>
      </section>

      <section class="specific-picker" aria-labelledby="specific-heading">
        <div class="specific-heading">
          <div>
            <p class="section-label">SPECIFIC EXERCISE</p>
            <h2 id="specific-heading">Choose an exercise yourself</h2>
          </div>
          <p class="set-count">{matching.length} matching</p>
        </div>
        <div class="specific-list">
          {exercisesByDifficulty.map(({ value, label, exercises }) => <section class="tutorial-levels" aria-label={`${label} exercises`} key={value}>
            <p class="section-label">{label.toUpperCase()}</p>
            {exercises.map((exercise) => <ChallengeStub exercise={exercise} key={`${exercise.slug}-${exercise.language}`} />)}
          </section>)}
          {matching.length === 0 && <p class="filter-hint">No exercises match this language and difficulty yet.</p>}
        </div>
      </section>
    </div>

    <section class="briefing">
      <article><b>01</b><h2>Read the ticket</h2><p>Understand the requested change and its constraints.</p></article>
      <article><b>02</b><h2>Inspect the PR</h2><p>Trace what the code actually changes.</p></article>
      <article><b>03</b><h2>Make the call</h2><p>Approve a safe launch or deny a risky one.</p></article>
    </section>
  </main>;
}
