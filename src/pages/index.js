import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Footer from '../components/Footer';
import { formatReadingTime } from '../utils/helpers';

import '../components/i18n';
import { getLanguage, getTranslate } from '../utils/language';

const BlogIndex = ({ data, location }) => {
  const language = getLanguage();
  const translate = getTranslate();
  const siteTitle = translate('site-title');
  const seoTitle = translate('homepage-title-seo');
  const posts = data.allMarkdownRemark.nodes.filter(
    (post) => post.fields.keyLanguage === language
  );

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={seoTitle} />
        <Bio />
        <p>{translate('homepage-content')}.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={seoTitle}
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    {post.frontmatter.date}
                    {` • ${formatReadingTime(post.timeToRead)}`}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.spoiler || post.excerpt,
                    }}
                    itemProp="spoiler"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
      <Footer />
    </Layout>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          keyLanguage
        }
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          spoiler
        }
      }
    }
  }
`;
