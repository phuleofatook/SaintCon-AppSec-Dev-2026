import { useEffect, useRef, useState } from 'preact/hooks';
import { ExerciseController } from './services/exercise-controller';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { ReviewPage } from './pages/ReviewPage';
import { Header } from './components/Header';
import { storyPages, storyTrack } from './story/story-content';
import { StoryBeatPage } from './pages/StoryBeatPage';

type AppMode = 'story' | 'ffa';

function parseReview(hash: string) {
  const match = hash.match(/^#review\/([^/]+)(?:\/([^/]+))?$/);
  return match ? { slug: match[1], language: match[2] } : undefined;
}

function parseStoryBeat(hash: string) {
  const match = hash.match(/^#story-page\/([^/]+)$/);
  return match ? match[1] : undefined;
}

type TrackEntry = { type: 'exercise'; exercise: ReturnType<ExerciseController['listExercisesForLanguage']>[number] } | { type: 'story'; pageId: string } | { type: 'language-selection' };
type ActiveTrack = { entries: TrackEntry[]; index: number };

function createStoryEntries(controller: ExerciseController, language: string): TrackEntry[] {
  const entries: TrackEntry[] = [];
  for (const beat of storyTrack) {
    if (beat.type === 'story') {
      if (storyPages[beat.pageId]) entries.push({ type: 'story', pageId: beat.pageId });
    } else if (beat.type === 'language-selection') {
      entries.push({ type: 'language-selection' });
    } else if (beat.type === 'exercises') {
      const exercises = controller.listStoryExercises(language, beat.group);
      entries.push(...exercises.map((exercise) => ({ type: 'exercise' as const, exercise })));
    }
  }
  return entries;
}

function entryHash(entry: TrackEntry) {
  if (entry.type === 'story') return `story-page/${entry.pageId}`;
  if (entry.type === 'language-selection') return 'story';
  return `review/${entry.exercise.slug}/${entry.exercise.language}`;
}

function modeFromHash(hash: string): AppMode | null {
  if (hash === '#ffa') return 'ffa';
  if (hash === '#story') return 'story';
  if (parseStoryBeat(hash)) return 'story';
  if (parseReview(hash)) {
    const saved = window.sessionStorage.getItem('saintcon-mode');
    return saved === 'story' || saved === 'ffa' ? saved : null;
  }
  return null;
}

export function App() {
  const controllerRef = useRef(new ExerciseController());
  const [hash, setHash] = useState(() => window.location.hash);
  const [mode, setMode] = useState<AppMode | null>(() => modeFromHash(window.location.hash));
  const [track, setTrack] = useState<ActiveTrack | null>(() => {
    const pageId = parseStoryBeat(window.location.hash);
    if (!pageId) return null;
    const savedLanguage = window.sessionStorage.getItem('saintcon-story-language');
    const languages = controllerRef.current.listLanguages();
    const language = savedLanguage && languages.includes(savedLanguage)
      ? savedLanguage
      : (languages.includes('typescript') ? 'typescript' : languages[0]);
    if (!language) return null;
    const entries = createStoryEntries(controllerRef.current, language);
    const index = entries.findIndex((entry) => entry.type === 'story' && entry.pageId === pageId);
    return index >= 0 ? { entries, index } : null;
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = window.localStorage.getItem('saintcon-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    const onHashChange = () => {
      const nextHash = window.location.hash;
      setHash(nextHash);
      if (nextHash === '' || nextHash === '#home') {
        setTrack(null);
        setMode(null);
      } else if (nextHash === '#ffa') {
        setTrack(null);
        setMode('ffa');
      } else if (nextHash === '#story') {
        setMode('story');
        const index = track?.entries.findIndex((entry) => entry.type === 'language-selection') ?? -1;
        if (track && index >= 0) setTrack({ ...track, index });
      } else if (track) {
        const review = parseReview(nextHash);
        const storyPageId = parseStoryBeat(nextHash);
        const index = track.entries.findIndex((entry) => entry.type === 'story'
          ? entry.pageId === storyPageId
          : entry.type === 'exercise' && Boolean(review && entry.exercise.slug === review.slug && entry.exercise.language === (review.language ?? track.entries.find((candidate) => candidate.type === 'exercise')?.exercise.language)));
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
  useEffect(() => {
    if (mode) window.sessionStorage.setItem('saintcon-mode', mode);
    else window.sessionStorage.removeItem('saintcon-mode');
  }, [mode]);
  const review = parseReview(hash);
  const exercise = review ? controllerRef.current.selectExercise(review.slug, review.language) : undefined;
  const goTo = (nextHash: string) => {
    window.location.hash = nextHash;
  };
  const startTrack = (language: string, difficulties: readonly string[]) => {
    const randomized = controllerRef.current.listExercisesForLanguage(language)
      .filter((candidate) => difficulties.length === 0 || difficulties.includes(candidate.item.difficulty))
      .sort(() => Math.random() - 0.5);
    const exercises = [
      ...randomized.filter((candidate) => candidate.item.difficulty === 'tutorial'),
      ...randomized.filter((candidate) => candidate.item.difficulty !== 'tutorial'),
    ];
    if (!exercises.length) return;
    setMode('ffa');
    setTrack({ entries: exercises.map((exercise) => ({ type: 'exercise', exercise })), index: 0 });
    goTo(`review/${exercises[0].slug}/${exercises[0].language}`);
  };
  const beginStory = () => {
    const languages = controllerRef.current.listLanguages();
    const language = languages.includes('typescript') ? 'typescript' : languages[0];
    if (!language) return;
    const entries = createStoryEntries(controllerRef.current, language);
    if (!entries.length) return;
    setMode('story');
    setTrack({ entries, index: 0 });
    goTo(entryHash(entries[0]));
  };
  const selectStoryLanguage = (language: string) => {
    const entries = createStoryEntries(controllerRef.current, language);
    const languageStep = entries.findIndex((entry) => entry.type === 'language-selection');
    const next = entries[languageStep + 1];
    if (!next) return;
    window.sessionStorage.setItem('saintcon-story-language', language);
    setMode('story');
    setTrack({ entries, index: languageStep + 1 });
    goTo(entryHash(next));
  };
  const currentEntry = track?.entries[track.index];
  const previousEntry = track && track.index > 0 ? track.entries[track.index - 1] : undefined;
  const nextEntry = track && track.index < track.entries.length - 1 ? track.entries[track.index + 1] : undefined;
  const storyPageId = parseStoryBeat(hash);
  const storyPage = storyPageId ? storyPages[storyPageId] : undefined;
  const onLanding = !exercise && !storyPage && hash !== '#ffa' && hash !== '#story';
  const showHeader = !onLanding || (mode === 'story' && hash !== '' && hash !== '#home');
  const menuHash = mode === 'ffa' ? 'ffa' : mode === 'story' ? 'story' : 'home';
  const navigableEntries = track?.entries ?? [];
  const currentStep = track && currentEntry ? track.index + 1 : 0;
  const trackProgressLabel = mode === 'story'
    ? `MISSION STEP ${currentStep} OF ${navigableEntries.length}`
    : `EXERCISE ${currentStep} OF ${navigableEntries.length}`;

  return (
    <>
      {showHeader && <Header theme={theme} onThemeChange={setTheme} menuHref={menuHash === 'home' ? undefined : `#${menuHash}`} menuLabel={menuHash === 'story' ? 'Mission menu' : 'Exercise menu'} />}
      {onLanding && (
        <button class="theme-toggle landing-theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          {theme === 'dark' ? 'LIGHT' : 'DARK'}
        </button>
      )}
      {exercise ? (
        <ReviewPage
          key={exercise.slug + exercise.language}
          exercise={exercise}
          previousHref={mode === 'story' && previousEntry ? entryHash(previousEntry) : undefined}
          nextHref={nextEntry ? entryHash(nextEntry) : undefined}
          menuHash={mode === 'story' ? 'home' : menuHash}
          trackProgressLabel={trackProgressLabel}
          completed={Boolean(track && !nextEntry)}
        />
      ) : hash === '#ffa' ? (
        <HomePage controller={controllerRef.current} onStartTrack={startTrack} />
      ) : hash === '#story' ? (
        <StoryPage
          controller={controllerRef.current}
          onBeginMission={selectStoryLanguage}
          onPrevious={previousEntry ? () => goTo(entryHash(previousEntry)) : undefined}
          progressLabel={track && currentEntry?.type === 'language-selection' ? trackProgressLabel : undefined}
        />
      ) : storyPage ? (
        <StoryBeatPage page={storyPage} onBack={previousEntry ? () => goTo(entryHash(previousEntry)) : undefined} onContinue={() => nextEntry && goTo(entryHash(nextEntry))} onFinish={() => goTo('home')} progressLabel={trackProgressLabel} isFirst={!previousEntry} isLast={!nextEntry} />
      ) : (
        <LandingPage onChooseStory={beginStory} onChooseFreeForAll={() => goTo('ffa')} />
      )}
    </>
  );
}
