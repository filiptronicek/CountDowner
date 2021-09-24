/**
 * Returns the difference between UTC and the provided time zone.
 * @param timeZone a name of the timezone you want to compare to (e.g. `America/Los_Angeles`)
 * @returns a number in hours representing the time difference between `timeZone` and UTC
 */
export function getTimezoneOffset(timeZone: string): number {
  const now = new Date();
  const tzString = now.toLocaleString("en-US", { timeZone });
  const localString = now.toLocaleString("en-US");
  const diff = (Date.parse(localString) - Date.parse(tzString)) / 3600000;
  const offset = diff + now.getTimezoneOffset() / 60;

  return -offset;
}

/**
 * Returns a short code for a timezone's name
 * @param timeZoneName a name of the timezone you want the abbreviation from (e.g. `America/Los_Angeles`)
 * @returns an abbreviation of the provided timezone
 */
export const getTimeZoneCode = (timeZoneName: string): string => {
  return new Date()
    .toLocaleTimeString("en-us", {
      timeZone: timeZoneName,
      timeZoneName: "short",
    })
    .split(" ")[2];
};

/**
 * Adds an amount of seconds to a Date object
 * @param date a Date object
 * @param seconds a number of seconds to add
 * @returns a new Date object with `seconds` added.
 */
export function dateAddSeconds(date: Date, seconds: number): Date {
  return new Date(Date.parse(date.toString()) + seconds * 1000);
}
