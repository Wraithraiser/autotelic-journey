import React from 'react';
import PropTypes from 'prop-types';

const LanguageFocus = ({ language, classNameProps }) => {
  return (
    <div className={`focus-language ${classNameProps}`}>
      <span>{language.toUpperCase()}</span>
    </div>
  );
};

LanguageFocus.propTypes = {
  language: PropTypes.string,
  classNameProps: PropTypes.string,
};

export { LanguageFocus };
