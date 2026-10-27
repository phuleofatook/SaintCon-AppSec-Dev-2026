export const idleResetMs = 5 * 60 * 1000;
export const idleActivityEvents = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel', 'scroll'] as const;

export function installIdleReset(onIdle: () => void, timeoutMs = idleResetMs) {
  let lastActivity = Date.now();
  let timer: number | undefined;
  let stopped = false;

  const noteActivity = () => { lastActivity = Date.now(); };

  function stop() {
    if (stopped) return;
    stopped = true;
    if (timer !== undefined) window.clearTimeout(timer);
    idleActivityEvents.forEach((eventName) => window.removeEventListener(eventName, noteActivity));
    document.removeEventListener('visibilitychange', checkVisibility);
  }

  function check() {
    if (stopped) return;
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timer = undefined;
    }
    const remaining = timeoutMs - (Date.now() - lastActivity);
    if (remaining <= 0) {
      stop();
      onIdle();
      return;
    }
    timer = window.setTimeout(check, remaining);
  }

  function checkVisibility() {
    if (!document.hidden) check();
  }

  idleActivityEvents.forEach((eventName) => window.addEventListener(eventName, noteActivity, { passive: true }));
  document.addEventListener('visibilitychange', checkVisibility);
  timer = window.setTimeout(check, timeoutMs);
  return stop;
}
