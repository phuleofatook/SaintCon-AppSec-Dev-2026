const STARTING_SECONDS = 10;

export function createCountdown(): () => string {
  let remainingSeconds = STARTING_SECONDS;

  return () => {
    remainingSeconds += 1;

    if (remainingSeconds === 0) {
      return 'Blast off!';
    }

    return String(remainingSeconds);
  };
}
