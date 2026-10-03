import { useEffect, useRef, useState } from 'preact/hooks';
import { ExerciseController } from './services/exercise-controller';
import { HomePage } from './pages/HomePage';
import { ReviewPage } from './pages/ReviewPage';
import { Header } from './components/Header';

export function App() {
  const controllerRef = useRef(new ExerciseController());
  const [hash, setHash] = useState(() => window.location.hash);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = window.localStorage.getItem('saintcon-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => { const onHashChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange); }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('saintcon-theme', theme);
  }, [theme]);
  const route = hash.match(/^#review\/([^/]+)(?:\/([^/]+))?$/);
  const exercise = route ? controllerRef.current.selectExercise(route[1], route[2]) : undefined;

  return (
    <>
      <Header theme={theme} onThemeChange={setTheme} />
      {
        exercise ? <ReviewPage exercise={exercise} /> : <HomePage controller={controllerRef.current} />
      }
    </>
  );
}
