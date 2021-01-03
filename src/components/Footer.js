import React from 'react';

import { rhythm } from '../utils/typography';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
      }}
    >
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
