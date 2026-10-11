type TrackAction = {
  href?: string;
  onClick?: () => void;
};

function NavigationAction({ action, direction, children }: { action?: TrackAction; direction: 'previous' | 'next'; children: string }) {
  if (!action) return <span class={`track-navigator-action track-navigator-action--${direction} is-unavailable`} aria-hidden="true">{children}</span>;

  const className = `track-navigator-action track-navigator-action--${direction}`;
  return action.href
    ? <a class={className} href={action.href}>{children}</a>
    : <button class={className} type="button" onClick={action.onClick}>{children}</button>;
}

export function TrackNavigator({ previous, next, progressLabel, variant = 'story' }: {
  previous?: TrackAction;
  next?: TrackAction;
  progressLabel: string;
  variant?: 'story' | 'review';
}) {
  return <nav class={`track-navigator track-navigator--${variant}`} aria-label="Track navigation">
    <NavigationAction action={previous} direction="previous">← Previous</NavigationAction>
    <span class="track-navigator-progress" aria-current="step">{progressLabel}</span>
    <NavigationAction action={next} direction="next">Next →</NavigationAction>
  </nav>;
}
