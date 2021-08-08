import dayjs from "dayjs";
import sum from "lodash.sum";

const parameters: Array<dayjs.UnitType> = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
];

const reduceOverview = (
  dateFrom: dayjs.Dayjs,
  dateTo: dayjs.Dayjs,
  diffs: number[]
): number[] => {
  const newDiffs: number[] = [];

  let index = 0;
  for (const diff of diffs) {
    if (index === 0) {
      // For years, there is no "overflowing", so just keep the value
      newDiffs.push(diff);
    } else {
      // For other units, use dayjs.subtract() to prevent overflowing values (13 months, 75 minutes, ..,)
      const reducedDate = dateTo.subtract(
        diffs[index === 0 ? index : index - 1],
        parameters[index === 0 ? index : index - 1]
      );
      const newDiff = reducedDate.diff(dateFrom, parameters[index]);
      newDiffs.push(newDiff);
    }

    index++;
  }

  return newDiffs;
};

const formatDiffs = (diffs: number[]): string => {
  const outputValues = [];
  const wentThrough = [];

  let index = 0;
  for (const unit of diffs) {
    wentThrough.push(unit);
    if ((unit !== 0 && wentThrough !== []) || sum(wentThrough) !== 0) {
      // If all previous and the current value are 0, don't add to the string, otherwise, add the formatted string
      outputValues.push(`${unit} ${parameters[index]}${unit === 1 ? "" : "s"}`);
    }
    index++;
  }

  return outputValues.join(" ");
};

const getDiffParams = (from: dayjs.Dayjs, to: dayjs.Dayjs): number[] => {
  const diffs: number[] = [];

  for (const param of parameters) {
    const difference = to.diff(from, param);
    diffs.push(difference);
  }

  return diffs;
};

const getFormattedDiffs = (
  today: dayjs.Dayjs,
  parsed: dayjs.Dayjs,
  interval?: NodeJS.Timer
) => {
  const diffs = getDiffParams(today, parsed);

  if (sum(diffs) > 0) {
    const reducedDiffs = reduceOverview(today, parsed, diffs);
    return formatDiffs(reducedDiffs);
  } else {
    if (interval) {
      clearInterval(interval);
    }
    return "Expired";
  }
};

export default getFormattedDiffs;
export { parameters, reduceOverview, formatDiffs, getDiffParams };
