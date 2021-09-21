const getNextDefaultEvent = (now: Date): [string, Date] => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // If Christmas was this year already, return New Year's Day
  if (month === 12 && day > 24) {
    return ["New Years", new Date(year + 1, 0, 1)];
  } else {
    return ["Christmas", new Date(year, 11, 25)];
  }
};

export default getNextDefaultEvent;
