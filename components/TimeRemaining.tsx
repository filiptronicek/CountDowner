import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import getFormattedDiffs from "@utils/dateManipulation";

const TimeRemaining = (props: {
  countingFrom: dayjs.Dayjs;
  countingTo: dayjs.Dayjs;
  timeOffset: number;
}): JSX.Element => {
  const { countingFrom, countingTo, timeOffset } = props;
  const formattedDiff = getFormattedDiffs(countingFrom.add(timeOffset, "ms"), countingTo);

  return (
    <div>
      {countingTo.isAfter(countingFrom) ? (
        <div
          id="countdown-area"
          className="mt-5 text-4xl text-black dark:text-white"
          onClick={() => {
            alert("Clicked");
          }}
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
