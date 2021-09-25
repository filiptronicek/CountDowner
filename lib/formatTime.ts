import plural from "./plural";

/**
 * Returns a string which denotes an amount of seconds in a more human readable format (days, hours, minutes, seconds)
 * @param seconds the amount of seconds to format
 * @returns a formatted string
 * @author @filiptronicek
 */
const formatTime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  if (days > 0) {
    return `~${days} ${plural("day", days)}`;
  }
  if (hours > 0) {
    return `~${hours} ${plural("hour", hours)}`;
  }
  if (minutes > 0) {
    return `~${minutes} ${plural("minute", minutes)}`;
  }
  return `${secondsLeft.toFixed(2)} ${plural("second", secondsLeft)}`;
};

export default formatTime;
