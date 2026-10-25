import titleArtUrl from '../assets/story-title.png';

export function LandingPage({ onChooseStory, onChooseFreeForAll, onResetProgress }: { onChooseStory: () => void; onChooseFreeForAll: () => void; onResetProgress: () => void }) {
  return (
    <main class="title-page">
      <button class="theme-toggle landing-reset-progress" type="button" onClick={onResetProgress}>RESET PROGRESS</button>
      <div class="title-page-art">
        <div class="title-page-image">
          <img src={titleArtUrl} alt="Ape Input: The Reviewer's Shift. Your throughput is through the roof. Now can you take ownership of it?" />
          <button class="title-art-action title-art-action--story" type="button" onClick={onChooseStory}>
            <span class="visually-hidden">Start Story Mode</span>
          </button>
          <button class="title-art-action title-art-action--free-for-all" type="button" onClick={onChooseFreeForAll}>
            <span class="visually-hidden">Start Free for All mode</span>
          </button>
        </div>
      </div>
    </main>
  );
}
