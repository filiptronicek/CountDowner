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

/**
 * Returns an array of date differences that have been made sure have no overflow. This for example takes in 65 seconds and returns just 5 (works like modulo).
 * @param dateFrom a day.js Date object that you want to be your starting date
 * @param dateTo a day.js Date object that you want to be your ending date
 * @param diffs an array of differences betweeen the two dates
 * @param units an array of day.js unit types (year, month, ...,)
 * @returns an updated `diffs` array containing values with no unit overflow
 */
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
  short: boolean = false,
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
      if (short) {
        if (["year", "month", "day"].includes(unit)) {
          outputValues.push(`${unitValue} ${plural(unit, unitValue)}`);
          break;
        } else {
          // If the unit is an hour, minute or a second, format the time in HH:mm:ss
          outputValues.push(`${unitValue.toString().padStart(2, "0")}`);
        }
      } else {
        outputValues.push(
          `${unitValue.toLocaleString()} ${plural(unit, unitValue)}`
        );
      }
    }
    index++;
  }

  return short ? outputValues.join(":") : outputValues.join(" ");
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
  short: boolean = false,
  customParameters: Array<dayjs.UnitType> = parameters
): string => {
  const diffs = getDiffParams(today, parsed, customParameters);

  if (sum(diffs) > 0) {
    const reducedDiffs = reduceOverview(today, parsed, diffs, customParameters);
    return formatDiffs(reducedDiffs, short, customParameters);
  } else {
    return "Expired";
  }
};

export default getFormattedDiffs;
export { parameters, reduceOverview, formatDiffs, getDiffParams };
