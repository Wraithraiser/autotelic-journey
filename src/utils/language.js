import { useTranslation } from 'react-i18next';

function getLanguage() {
  const { i18n } = useTranslation();
  const fallbackLanguage = i18n.options.fallbackLng[0];
  const languages = [fallbackLanguage, 'en'];
  let currentLanguage = i18n.languages[0];

  if (languages.includes(currentLanguage)) return currentLanguage;
  return fallbackLanguage;
}

export { getLanguage };
