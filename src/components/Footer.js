import React from 'react';
import { getTranslate } from '../utils/language';

const Footer = () => {
  const translate = getTranslate();
  return (
    <footer>
      © {new Date().getFullYear()}, {translate('footer-credential')}
      {` `}
      <a
        href="https://www.gatsbyjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gatsby
      </a>
    </footer>
  );
};

export default Footer;
