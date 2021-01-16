import { useTranslation } from 'react-i18next';

function getTranslate() {
  const { t } = useTranslation();
  return t;
}

export { getTranslate };
