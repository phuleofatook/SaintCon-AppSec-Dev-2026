import type { StoryPageDefinition } from '../story/story-content';
import { TrackNavigator } from '../components/TrackNavigator';

export function StoryBeatPage({ page, onBack, onContinue, onFinish, progressLabel, isFirst = false, isLast = false }: { page: StoryPageDefinition; onBack?: () => void; onContinue: () => void; onFinish: () => void; progressLabel: string; isFirst?: boolean; isLast?: boolean }) {
  if (page.type === 'component') {
    const Page = page.Component;
    return <Page onContinue={onContinue} onFinish={onFinish} isLast={isLast} />;
  }

  const content = page.content;
  return <main class="story-briefing story-beat">
    <p class="eyebrow">{content.eyebrow}</p>
    <h1>{content.title}</h1>
    {content.image && <div class={`story-art-frame story-art-frame--${content.imageLayout ?? 'standard'}`}>
      <img class="story-art" src={content.image} alt={content.imageAlt ?? ''} />
      {content.imageAction && <button class={`story-art-action story-art-action--${content.imageAction.placement}`} type="button" aria-label={content.imageAction.label} onClick={isLast ? onFinish : onContinue}>
        <span class="visually-hidden">{content.imageAction.label}</span>
      </button>}
    </div>}
    <TrackNavigator
      previous={!isFirst && onBack ? { onClick: onBack } : undefined}
      next={{ onClick: isLast ? onFinish : onContinue }}
      progressLabel={progressLabel}
    />
  </main>;
}
