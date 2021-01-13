import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageMenu = () => {
  const { i18n } = useTranslation();

  const [getLanguage, setLanguage] = useState(i18n.language);

  function handleChange(event) {
    i18n.changeLanguage(event.target.value);

    setLanguage(event.target.value);
  }

  return (
    <select
      value={getLanguage}
      onChange={(e) => handleChange(e)}
      className="select-language"
    >
      <option value="fr">FR</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LanguageMenu;
