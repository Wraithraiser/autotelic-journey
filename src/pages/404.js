import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { getTranslate } from '../utils/language';

const NotFoundPage = ({ location, pageContext: { locale: language } }) => {
  const translate = getTranslate();
  const siteTitle = translate('site-title');

  return (
    <Layout location={location} title={siteTitle} language={language}>
      <SEO title="404: Not Found" />
      <h1>{translate('404-not-found-title')}</h1>
      <p>{translate('404-not-found-description')}</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/ZbZSe6N_BXs"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Layout>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.object,
};

export default NotFoundPage;
