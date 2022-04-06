/**
 * Function for creating intervals that run exactly once per second.
 * Modified from the original (https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95)
 * @author Jake Archibald
 */

export function animationInterval(
  ms: number,
  signal: AbortSignal,
  callback: any,
) {
  // Prefer currentTime, as it'll better sync animtions queued in the
  // same frame, but if it isn't supported, performance.now() is fine.
  const start = document.timeline?.currentTime
    ? document.timeline.currentTime
    : performance.now();

  function frame(time: number) {
    if (signal.aborted) return;
    callback(time);
    scheduleFrame(time);
  }

  function scheduleFrame(time: number) {
    const elapsed = time - start;
    const roundedElapsed = Math.round(elapsed / ms) * ms;
    const targetNext = start + roundedElapsed + ms;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(frame), delay);
  }

  scheduleFrame(start);
}
