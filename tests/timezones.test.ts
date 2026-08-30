import * as timezone from '../lib/timeZones';

test('Date additions are calculated correctly', () => {
  const original = new Date('2021-01-01T00:00:00Z');
  const newDate = timezone.dateAddSeconds(original, 69.42);
  expect(newDate.getTime() - original.getTime()).toEqual(69_420);
});
