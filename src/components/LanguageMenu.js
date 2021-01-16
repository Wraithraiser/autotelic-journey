import React from 'react';
import PropTypes from 'prop-types';
import { LocalizedLink } from 'gatsby-theme-i18n';

const LanguageMenu = ({ to, language }) => {
  const currentFrenchLanguage = (
    <>
      <div className="focus-language focus-language--fr">
        <span>{`FR`}</span>
      </div>
      <div className="select-language">
        <LocalizedLink to={to} language={'en'}>
          {'EN'}
        </LocalizedLink>
      </div>
    </>
  );

  const currentEnglishLanguage = (
    <>
      <div className="select-language select-language--fr">
        <LocalizedLink to={to} language={'fr'}>
          {'FR'}
        </LocalizedLink>
      </div>
      <div className="focus-language focus-language--en">
        <span>{`EN`}</span>
      </div>
    </>
  );

  return (
    <>{language === 'fr' ? currentFrenchLanguage : currentEnglishLanguage}</>
  );
};

LanguageMenu.propTypes = {
  to: PropTypes.string,
  language: PropTypes.string,
};

export default LanguageMenu;
