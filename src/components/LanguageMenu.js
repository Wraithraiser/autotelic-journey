import React from 'react';
import PropTypes from 'prop-types';
import { LocalizedLink } from 'gatsby-theme-i18n';

const LanguageMenu = ({ to, language }) => {
  const showFrenchLanguage = language !== 'fr';
  const showEnglishLanguage = language !== 'en';

  const currentLanguage = (
    <div className="focus-language">
      <span>{language.toUpperCase()}</span>
    </div>
  );

  const switchLanguage = (languageToSelect) => {
    return (
      <div className="select-language">
        <LocalizedLink to={to} language={languageToSelect}>
          {languageToSelect.toUpperCase()}
        </LocalizedLink>
      </div>
    );
  };
  return (
    <>
      {showFrenchLanguage && (
        <>
          {currentLanguage}
          {switchLanguage('fr')}
        </>
      )}
      {showEnglishLanguage && (
        <>
          {currentLanguage}
          {switchLanguage('en')}
        </>
      )}
    </>
  );
};

LanguageMenu.propTypes = {
  to: PropTypes.string,
  language: PropTypes.string,
};

export default LanguageMenu;
