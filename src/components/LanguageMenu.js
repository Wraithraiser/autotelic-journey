import React from 'react';
import PropTypes from 'prop-types';
import { LocalizedLink } from 'gatsby-theme-i18n';

const LanguageMenu = ({ to, language }) => {
  const showFrenchLanguage = language !== 'fr';
  const showEnglishLanguage = language !== 'en';
  return (
    <div className="select-language">
      {showFrenchLanguage && (
        <LocalizedLink to={to} language="fr">
          {'FR'}
        </LocalizedLink>
      )}
      {showEnglishLanguage && (
        <LocalizedLink to={to} language="en">
          {'EN'}
        </LocalizedLink>
      )}
    </div>
  );
};

LanguageMenu.propTypes = {
  to: PropTypes.string,
  language: PropTypes.string,
};

export default LanguageMenu;
