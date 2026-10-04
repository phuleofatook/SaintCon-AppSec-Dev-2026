import { useEffect, useRef, useState } from 'preact/hooks';
import { ExerciseController } from './services/exercise-controller';
import { HomePage } from './pages/HomePage';
import { ReviewPage } from './pages/ReviewPage';
import { Header } from './components/Header';

export function App() {
  const controllerRef = useRef(new ExerciseController());
  const [hash, setHash] = useState(() => window.location.hash);
  const [track, setTrack] = useState<{ exercises: ReturnType<ExerciseController['listExercisesForLanguage']>[number][]; index: number } | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = window.localStorage.getItem('saintcon-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    const onHashChange = () => {
      const nextHash = window.location.hash;
      setHash(nextHash);
      if (nextHash === '' || nextHash === '#home') setTrack(null);
      else if (track) {
        const match = nextHash.match(/^#review\/([^/]+)(?:\/([^/]+))?$/);
        const index = match ? track.exercises.findIndex((candidate) => candidate.slug === match[1] && candidate.language === (match[2] ?? track.exercises[0]?.language)) : -1;
        if (index >= 0) setTrack({ ...track, index });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [track]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('saintcon-theme', theme);
  }, [theme]);
  const route = hash.match(/^#review\/([^/]+)(?:\/([^/]+))?$/);
  const exercise = route ? controllerRef.current.selectExercise(route[1], route[2]) : undefined;
  const startTrack = (language: string, difficulty: string) => {
    const exercises = controllerRef.current.listExercisesForLanguage(language)
      .filter((candidate) => difficulty === 'any' || candidate.item.difficulty === difficulty)
      .sort(() => Math.random() - 0.5);
    if (!exercises.length) return;
    setTrack({ exercises, index: 0 });
    window.location.hash = `review/${exercises[0].slug}/${exercises[0].language}`;
  };
  const next = track && exercise && track.index < track.exercises.length - 1 ? track.exercises[track.index + 1] : undefined;

  return (
    <>
      <Header theme={theme} onThemeChange={setTheme} />
      {
        exercise ? <ReviewPage key={exercise.slug + exercise.language} exercise={exercise} nextExercise={next} progress={track && track.exercises.some((candidate) => candidate.slug === exercise.slug && candidate.language === exercise.language) ? { current: track.index + 1, total: track.exercises.length } : undefined} completed={Boolean(track && !next && track.exercises.some((candidate) => candidate.slug === exercise.slug && candidate.language === exercise.language))} /> : <HomePage controller={controllerRef.current} onStartTrack={startTrack} />
      }
    </>
  );
}
