import { useEffect, useRef, useState } from 'preact/hooks';
import { ExerciseController } from './services/exercise-controller';
import { HomePage } from './pages/HomePage';
import { ReviewPage } from './pages/ReviewPage';
import { Header } from './components/Header';

export function App() {
  const controllerRef = useRef(new ExerciseController());
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => { const onHashChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange); }, []);
  const slug = hash.match(/^#review\/([^/]+)$/)?.[1];
  const exercise = slug ? controllerRef.current.selectExercise(slug) : undefined;

  return (
    <>
      <Header />
      {
        exercise ? <ReviewPage exercise={exercise} /> : <HomePage controller={controllerRef.current} />
      }
    </>
  );
}
