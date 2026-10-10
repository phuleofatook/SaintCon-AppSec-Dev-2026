import titleArtUrl from '../assets/story-title.png';

export function LandingPage({ onChooseStory, onChooseFreeForAll }: { onChooseStory: () => void; onChooseFreeForAll: () => void }) {
  return (
    <main class="title-page">
      <div class="title-page-art">
        <img src={titleArtUrl} alt="Spaceways Ape Input: Application Development Operations. Many keyboards. Brighter software." />
      </div>
      <section class="mode-selector" aria-labelledby="mode-heading">
        <p class="section-label" id="mode-heading">CHOOSE YOUR FLIGHT PATH</p>
        <div class="mode-actions">
          <button class="mode-card" type="button" onClick={onChooseStory}>
            <span class="mode-card-kicker">CAMPAIGN</span>
            <strong>Story Mode</strong>
            <span>Follow the Spaceways briefing and review the change that just hit your queue.</span>
          </button>
          <button class="mode-card" type="button" onClick={onChooseFreeForAll}>
            <span class="mode-card-kicker">PRACTICE</span>
            <strong>Free for All</strong>
            <span>Pick a language, difficulty, or a specific exercise and fly your own pattern.</span>
          </button>
        </div>
      </section>
    </main>
  );
}
