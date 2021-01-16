import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Layout = ({ location, title, language, languageMenu, children }) => {
  const rootPath =
    language === 'fr'
      ? `${__PATH_PREFIX__}/`
      : `${__PATH_PREFIX__}/${language}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <>
        <h1 className="main-heading">
          <Link to={rootPath}>{title}</Link>
        </h1>
        {languageMenu}
      </>
    );
  } else {
    header = (
      <>
        <Link className="header-link-home" to={rootPath}>
          {title}
        </Link>
        {languageMenu}
      </>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  language: PropTypes.string,
  languageMenu: PropTypes.node,
  children: PropTypes.node,
};

export default Layout;
