import { useState } from 'preact/hooks';
import type { ExerciseController } from '../services/exercise-controller';
import { TrackNavigator } from '../components/TrackNavigator';

function languageLabel(item: string) {
  if (item === 'typescript') return 'TypeScript';
  if (item === 'python') return 'Python';
  if (item === 'java') return 'Java';
  return item.toUpperCase();
}

export function StoryPage({ controller, onBeginMission, onPrevious, progressLabel }: {
  controller: ExerciseController;
  onBeginMission: (language: string) => void;
  onPrevious?: () => void;
  progressLabel?: string;
}) {
  const languages = controller.listLanguages();
  const [language, setLanguage] = useState(languages.includes('typescript') ? 'typescript' : languages[0] ?? '');
  const ready = controller.listExercisesForLanguage(language).length > 0;

  return (
    <main class="story-briefing">
      <a class="back" href="#home">Back to title</a>
      <p class="eyebrow">STORY MODE · FLIGHT CONTROL</p>
      <h1>Choose your language.</h1>
      <p class="intro">Set up your mission. Flight Control will guide you through the story and review exercises in order.</p>
      <section class="practice-setup" aria-labelledby="story-launch-heading">
        <div>
          <p class="section-label">MISSION SETUP</p>
          <h2 id="story-launch-heading">Select a language</h2>
          <p class="filter-hint">Your story begins with a briefing, then moves through the tutorials and the remaining reviews.</p>
        </div>
        <div class="setup-fields">
          <label class="setup-field">LANGUAGE
            <select value={language} onChange={(event) => setLanguage((event.currentTarget as HTMLSelectElement).value)}>
              {languages.map((item) => <option value={item} key={item}>{languageLabel(item)}</option>)}
            </select>
          </label>
        </div>
        <button class="primary-action" type="button" disabled={!ready} onClick={() => onBeginMission(language)}>Begin mission <span>→</span></button>
      </section>
      {progressLabel && <TrackNavigator
        previous={onPrevious ? { onClick: onPrevious } : undefined}
        next={ready ? { onClick: () => onBeginMission(language) } : undefined}
        progressLabel={progressLabel}
      />}
    </main>
  );
}
