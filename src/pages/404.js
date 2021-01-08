import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>
        You just hit a route that doesn&#39;t exist... but let's just be Happy !
      </p>
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
  data: PropTypes.object,
  location: PropTypes.object,
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
