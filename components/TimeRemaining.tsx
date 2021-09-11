import dayjs from "dayjs";
// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const TimeRemaining = (props: {
  countingFrom: dayjs.Dayjs;
  countingTo: dayjs.Dayjs;
  formattedDiff: string;
  timeOffset: number;
}): JSX.Element => {
  const { countingFrom, countingTo, formattedDiff, timeOffset } = props;
  return (
    <div>
      {countingTo.isAfter(countingFrom) ? (
        <div
          id="countdown-area"
          className="mt-5 text-4xl text-black dark:text-white"
        >
          {formattedDiff}
        </div>
      ) : (
        <div className="mt-5 text-4xl text-black dark:text-white">
          This countdown has passed{" "}
          {countingFrom.add(timeOffset, "ms").to(countingTo)}
        </div>
      )}
    </div>
  );
};

export default TimeRemaining;
