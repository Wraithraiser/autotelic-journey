import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { LocalizedLink } from 'gatsby-theme-i18n';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import { getTranslate } from '../utils/language';
import LanguageMenu from '../components/LanguageMenu';
import { LanguageFocus } from '../components/LanguageFocus';

const BlogPostTemplate = ({
  data,
  location,
  pageContext: { translatedPosts, locale: language },
}) => {
  const translate = getTranslate();
  const siteTitle = translate('site-title');
  const post = data.markdownRemark;
  const { previous, next } = data;

  const translatedPost = translatedPosts.find(
    (post) => post.language !== language
  );
  const languageMenu = translatedPost ? (
    <LanguageMenu to={translatedPost.slug} language={language} />
  ) : (
    <LanguageFocus language={language} classNameProps={`focus-language--fr`} />
  );

  return (
    <Layout
      location={location}
      title={siteTitle}
      language={language}
      languageMenu={languageMenu}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>
            {formatPostDate(post.frontmatter.date, language)}
            {` • ${formatReadingTime(post.timeToRead)}`}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <h3>
          <LocalizedLink to={'/'} language={language}>
            {siteTitle}
          </LocalizedLink>
        </h3>
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <LocalizedLink
                to={previous.frontmatter.slug}
                language={language}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </LocalizedLink>
            )}
          </li>
          <li>
            {next && (
              <LocalizedLink
                to={next.frontmatter.slug}
                language={language}
                rel="next"
              >
                {next.frontmatter.title} →
              </LocalizedLink>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  pageContext: PropTypes.object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      fields {
        language
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      timeToRead
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        slug
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        slug
        title
      }
    }
  }
`;
