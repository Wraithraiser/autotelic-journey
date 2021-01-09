import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import englishTranslation from '../locales/en/translation.json';
import frenchTranslation from '../locales/fr/translation.json';

const resources = {
  en: {
    translation: englishTranslation,
  },
  fr: {
    translation: frenchTranslation,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
