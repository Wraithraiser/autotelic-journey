import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import LanguageMenu from './LanguageMenu';

const Layout = ({
  location,
  title,
  showLanguageMenu,
  language,
  setLanguage,
  children,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <>
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
        <LanguageMenu language={language} setLanguage={setLanguage} />
      </>
    );
  } else {
    header = (
      <>
        <Link className="header-link-home" to="/">
          {title}
        </Link>
        {showLanguageMenu && (
          <LanguageMenu language={language} setLanguage={setLanguage} />
        )}
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
  showLanguageMenu: PropTypes.bool,
  language: PropTypes.string,
  setLanguage: PropTypes.func,
  children: PropTypes.node,
};

export default Layout;
