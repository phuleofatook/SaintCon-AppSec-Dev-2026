const STARTING_SECONDS = 10;

export function createCountdown(): () => string {
  let remainingSeconds = STARTING_SECONDS;

  return () => String(remainingSeconds);
}
