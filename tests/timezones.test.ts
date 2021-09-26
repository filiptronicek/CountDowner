import * as timezone from "../lib/timeZones";

test("Date additions are calculated correctly", () => {
  const original = new Date();
  const newDate = timezone.dateAddSeconds(original, 69.42);
  expect(newDate.getTime() - original.getTime()).toEqual(69_420);
});

test("Timezones are abbreviated correctly", () => {
  const tzs = ["Europe/Prague", "Europe/London", "Asia/Kolkata"];
const computedAbbrs = [];
    for (const t of tzs) {
        computedAbbrs.push(timezone.getTimeZoneCode(t));
    }

  expect(computedAbbrs).toEqual(["CEST", "BST", "IST"]);
});
