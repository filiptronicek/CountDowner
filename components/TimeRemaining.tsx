import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
dayjs.extend(relativeTime);

import getFormattedDiffs from '@utils/dateManipulation';

const parameters: Array<dayjs.UnitType> = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
];

const possibleStates = [
  parameters,
  [parameters[0]],
  [parameters[1]],
  [parameters[2]],
  [parameters[3]],
  [parameters[4]],
  [parameters[5]],
];

const TimeRemaining = (props: {
  countingFrom: dayjs.Dayjs;
  countingTo: dayjs.Dayjs;
  timeOffset: number;
}): JSX.Element => {
  const { countingFrom, countingTo, timeOffset } = props;
  const [state, setState] = useState(possibleStates[0]);
  const currentStateIndex = possibleStates.indexOf(state);

  const formattedDiff = getFormattedDiffs(
    countingFrom.add(timeOffset, 'ms'),
    countingTo,
    false,
    state,
  );

  const handleNextState = (): void => {
    if (currentStateIndex === possibleStates.length - 1) {
      setState(possibleStates[0]);
    } else {
      setState(possibleStates[currentStateIndex + 1]);
    }
  };

  if (countingTo.isAfter(countingFrom) && formattedDiff === 'Expired') {
    handleNextState();
  }

  return (
    <div>
      {countingTo.isAfter(countingFrom) ? (
        <div
          id="countdown-area"
          className="mt-5 text-4xl text-black dark:text-white cursor-pointer"
          onClick={() => {
            handleNextState();
          }}
        >
          {formattedDiff}
        </div>
      ) : (
        <div className="mt-5 text-4xl text-black dark:text-white">
          This countdown has passed{' '}
          {countingFrom.add(timeOffset, 'ms').to(countingTo)}
        </div>
      )}
    </div>
  );
};

export default TimeRemaining;
