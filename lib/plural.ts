/**
 * Returns a word in it's singular/plural form.
 * @param word the word to be pluralized
 * @param count the count of `word`
 * @returns a pluralized string of `word` according to `count`
 * @author @filiptronicek
 */
const plural = (word: string, count: number): string => {
  if (count === 1) {
    return word;
  }
  if (word.endsWith('s')) {
    return word + 'es';
  }
  return word + 's';
};

export default plural;
