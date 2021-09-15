import dayjs from "dayjs";
import sum from "lodash.sum";

import plural from "./plural";

const parameters: Array<dayjs.UnitType> = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
];

// A function that makes sure no number overflows happen (13 months, 75 minutes, ..,)
const reduceOverview = (
  dateFrom: dayjs.Dayjs,
  dateTo: dayjs.Dayjs,
  diffs: number[],
  units: Array<dayjs.UnitType> = parameters
): number[] => {
  const newDiffs: number[] = [];

  let index = 0;
  for (const diff of diffs) {
    if (index === 0) {
      // For years, there is no "overflowing", so just keep the value
      newDiffs.push(diff);
    } else {
      // For other units, use dayjs.subtract() to prevent overflowing values
      const reducedDate = dateTo.subtract(
        diffs[index === 0 ? index : index - 1],
        units[index === 0 ? index : index - 1]
      );
      const newDiff = reducedDate.diff(dateFrom, units[index]);
      newDiffs.push(newDiff);
    }

    index++;
  }

  return newDiffs;
};

const formatDiffs = (
  diffs: number[],
  units: Array<dayjs.UnitType> = parameters
): string => {
  const outputValues = [];
  const wentThrough = [];

  let index = 0;
  for (const unitValue of diffs) {
    wentThrough.push(unitValue);
    const unit = units[index];
    if ((unitValue !== 0 && wentThrough !== []) || sum(wentThrough) !== 0) {
      // If all previous and the current value are 0, don't add to the string, otherwise, add the formatted string
      outputValues.push(`${unitValue} ${plural(unit, unitValue)}`);
    }
    index++;
  }

  return outputValues.join(" ");
};

const getDiffParams = (
  from: dayjs.Dayjs,
  to: dayjs.Dayjs,
  units: Array<dayjs.UnitType> = parameters
): number[] => {
  const diffs: number[] = [];

  for (const unit of units) {
    const difference = to.diff(from, unit);
    diffs.push(difference);
  }

  return diffs;
};

const getFormattedDiffs = (
  today: dayjs.Dayjs,
  parsed: dayjs.Dayjs,
  customParameters: Array<dayjs.UnitType> = parameters
): string => {
  const diffs = getDiffParams(today, parsed, customParameters);

  if (sum(diffs) > 0) {
    const reducedDiffs = reduceOverview(today, parsed, diffs, customParameters);
    return formatDiffs(reducedDiffs, customParameters);
  } else {
    return "Expired";
  }
};

export default getFormattedDiffs;
export { parameters, reduceOverview, formatDiffs, getDiffParams };
