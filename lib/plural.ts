const plural = (word: string, count: number): string => {
  if (word === undefined) {
    return "";
  }
  if (count === 1) {
    return word;
  }
  if (word.endsWith("s")) {
    return word + "es";
  }
  return word + "s";
};

export default plural;