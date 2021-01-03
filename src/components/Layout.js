import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1
        className="main-heading"
        style={{
          ...scale(1.0),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          className="header-link-home"
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `#3fa0a3`,
          }}
          to="/"
        >
          {title}
        </Link>
      </h3>
    );
  }

  return (
    <div
      className="global-wrapper"
      data-is-root-path={isRootPath}
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header className="global-header">{header}</header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
