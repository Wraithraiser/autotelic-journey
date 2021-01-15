import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LanguageMenu = ({ language, setLanguage }) => {
  const { i18n } = useTranslation();
  const options = [
    { value: 'fr', label: 'FR' },
    { value: 'en', label: 'EN' },
  ];

  const handleChange = ({ value }) => {
    i18n.changeLanguage(value);
    setLanguage(value);
  };

  return (
    <div className="select-language">
      <Select
        value={{ value: language, label: language?.toUpperCase() }}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

LanguageMenu.propTypes = {
  language: PropTypes.string,
  setLanguage: PropTypes.func,
};

export default LanguageMenu;
