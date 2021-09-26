import getFormattedDiffs from "@utils/dateManipulation";
import dayjs from "dayjs";

test("Expired countdowns terminate with an output", () => {
  const fromDate = dayjs("June 31 1987");
  const toDate = dayjs("June 10 1987");

  expect(getFormattedDiffs(fromDate, toDate)).toMatch("Expired");
});

test("The formatting of dates in the future is correct", () => {
  const fromDate = dayjs("June 10 1987");
  const toDate = dayjs("June 31 1987").add(519, "second");

  expect(getFormattedDiffs(fromDate, toDate)).toMatch(
    "21 days 0 hours 8 minutes 39 seconds"
  );
});
