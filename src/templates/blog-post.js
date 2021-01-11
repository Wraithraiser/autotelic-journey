import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { formatReadingTime } from '../utils/helpers';
import { getLanguage } from '../utils/language';

const BlogPostTemplate = ({ data, location }) => {
  const language = getLanguage();
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.customTitle[language] || `Title`;
  const { previous, next } = data;

  if (post.fields.keyLanguage !== language) {
    let pathnameToNavigate = `/${language}${location.pathname}`;
    if (language === 'fr') {
      const pathnameWithoutKeyLanguage = location.pathname.split(
        post.fields.keyLanguage
      )[1];
      pathnameToNavigate = pathnameWithoutKeyLanguage;
    }
    import('gatsby')
      .then(({ navigate }) => {
        navigate(pathnameToNavigate);
      })
      .catch((err) => console.log(`dynamic import navigate => ${err}`));
  }

  return (
    <Layout location={location} title={siteTitle}>
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
            {post.frontmatter.date}
            {` • ${formatReadingTime(post.timeToRead)}`}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <h3>
          <Link to={'/'}>An Autotelic Journey</Link>
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
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
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        customTitle {
          fr
          en
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      fields {
        keyLanguage
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
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
