/**
 * Returns an event nearest to occur from `now`.
 * @param now the date the event is calculated from
 * @returns a tuple of the event name and it's Date object
 * @author @filiptronicek
 */
const getNextDefaultEvent = (now: Date): [string, Date] => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // If Christmas was this year already, return New Year's Day
  if (month === 11 && day > 24) {
    return ['New Years', new Date(year + 1, 0, 1)];
  } else {
    return ['Christmas', new Date(year, 11, 25)];
  }
};

export default getNextDefaultEvent;
