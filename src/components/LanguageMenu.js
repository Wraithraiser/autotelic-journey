import React from 'react';
import PropTypes from 'prop-types';
import { LocalizedLink } from 'gatsby-theme-i18n';
import { LanguageFocus } from './LanguageFocus';

const LanguageMenu = ({ to, language }) => {
  const currentFrenchLanguage = (
    <>
      <LanguageFocus
        language={language}
        classNameProps={`focus-language--fr`}
      />
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
      <LanguageFocus
        language={language}
        classNameProps={`focus-language--en`}
      />
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
