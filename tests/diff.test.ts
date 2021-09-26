import { getDiffParams } from '../lib/dateManipulation';
import dayjs from 'dayjs';

test('The difference in seconds is computed correctly', () => {
  const randomSeconds = 4;

  const fromDate = dayjs('June 10 1987');
  const toDate = fromDate.add(randomSeconds, 'second');

  const params = getDiffParams(fromDate, toDate);

  expect(params[params.length - 1]).toBe(randomSeconds);
});
