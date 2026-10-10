import type { StoryPageDefinition } from '../story/story-content';

export function StoryBeatPage({ page, onBack, onContinue, onFinish, isFirst = false, isLast = false }: { page: StoryPageDefinition; onBack?: () => void; onContinue: () => void; onFinish: () => void; isFirst?: boolean; isLast?: boolean }) {
  if (page.type === 'component') {
    const Page = page.Component;
    return <Page onContinue={onContinue} onFinish={onFinish} isLast={isLast} />;
  }

  const content = page.content;
  return <main class="story-briefing story-beat">
    <p class="eyebrow">{content.eyebrow}</p>
    <h1>{content.title}</h1>
    {content.image && <div class="story-art-frame">
      <img class="story-art" src={content.image} alt={content.imageAlt ?? ''} />
      {content.imageAction && <button class={`story-art-action story-art-action--${content.imageAction.placement}`} type="button" aria-label={content.imageAction.label} onClick={onContinue}>
        <span class="visually-hidden">{content.imageAction.label}</span>
      </button>}
    </div>}
    <div class="story-copy">{content.paragraphs.map((paragraph) => <p class="intro" key={paragraph}>{paragraph}</p>)}</div>
    <div class="story-navigation">
      {!isFirst && onBack && <button class="secondary-action" type="button" onClick={onBack}>&larr; Previous</button>}
      <button class="primary-action" type="button" onClick={isLast ? onFinish : onContinue}>{isLast ? 'Return to mission menu' : 'Next'} <span aria-hidden="true">&rarr;</span></button>
    </div>
  </main>;
}
