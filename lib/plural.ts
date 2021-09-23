import { useTranslation } from "react-i18next";
const { t } = useTranslation();

const plural = (word: string, count: number): string => {
  if (word === undefined) {
    return "";
  }
  if (count === 1) {
    return t(word);
  }
  if (word.endsWith("s")) {
    return t(word + "es");
  }
  return t(word + "s");
};

export default plural;
