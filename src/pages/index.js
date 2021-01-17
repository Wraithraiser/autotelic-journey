import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { LocalizedLink } from 'gatsby-theme-i18n';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Footer from '../components/Footer';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import { getTranslate } from '../utils/language';
import LanguageMenu from '../components/LanguageMenu';

const BlogIndex = ({ data, location, pageContext: { locale: language } }) => {
  const translate = getTranslate();
  const siteTitle = translate('site-title');
  const seoTitle = translate('homepage-title-seo');
  const posts = data.allMarkdownRemark.nodes.filter(
    (post) => post.fields.language === language
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

  const languageMenu = <LanguageMenu to="/" language={language} />;

  return (
    <Layout
      location={location}
      title={siteTitle}
      language={language}
      languageMenu={languageMenu}
    >
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
                    <LocalizedLink
                      itemProp="url"
                      to={post.frontmatter.slug}
                      language={language}
                    >
                      <span itemProp="headline">{title}</span>
                    </LocalizedLink>
                  </h2>
                  <p>
                    {formatPostDate(post.frontmatter.date, language)}
                    {` • ${formatReadingTime(post.timeToRead)}`}
                  </p>
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
  pageContext: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          language
        }
        timeToRead
        frontmatter {
          slug
          date(formatString: "MMMM DD, YYYY")
          title
          spoiler
        }
      }
    }
  }
`;
