import getRandomValues from "get-random-values";

const getRandomID = (n: number): string => {
  return [...getRandomValues(new Uint8Array(n))]
    .map(
      (x, i) => (
        (i = ((x / 255) * 61) | 0),
        String.fromCharCode(i + (i > 9 ? (i > 35 ? 61 : 55) : 48))
      )
    )
    .join("");
};

export default getRandomID;
