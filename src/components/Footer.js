import React from 'react';

const Footer = () => {
  return (
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a
        href="https://www.gatsbyjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gatsby
      </a>{' '}
      and inspired by{` `}
      <a
        href="https://overreacted.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Overreacted
      </a>
    </footer>
  );
};

export default Footer;
