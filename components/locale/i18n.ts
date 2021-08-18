import cs from "./languages/cs.json";
import sk from "./languages/sk.json";
import en from "./languages/en.json";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  cs: { translation: cs },
  sk: { translation: sk },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
