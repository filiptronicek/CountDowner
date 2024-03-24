import * as timezone from '../lib/timeZones';

test('Date additions are calculated correctly', () => {
  const original = new Date();
  const newDate = timezone.dateAddSeconds(original, 69.42);
  expect(newDate.getTime() - original.getTime()).toEqual(69_420);
});
