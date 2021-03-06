const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPostComponent = path.resolve(`./src/templates/blog-post.js`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              language
            }
            frontmatter {
              articleId
              slug
            }
            timeToRead
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    const englishPosts = [];
    const defaultFrenchPosts = [];

    posts.forEach((post) => {
      post.fields.language === 'fr'
        ? defaultFrenchPosts.push(post)
        : englishPosts.push(post);
    });

    createPostPages(createPage, defaultFrenchPosts, posts, blogPostComponent);
    createPostPages(createPage, englishPosts, posts, blogPostComponent);
  }
};

function createPostPages(
  createPage,
  languagePosts,
  allPosts,
  blogPostComponent
) {
  languagePosts.forEach((currentPost, index) => {
    const previousPostId = index === 0 ? null : languagePosts[index - 1].id;
    const nextPostId =
      index === languagePosts.length - 1 ? null : languagePosts[index + 1].id;

    const translatedPosts = [];
    allPosts.forEach((post) => {
      if (
        post.frontmatter.articleId === currentPost.frontmatter.articleId &&
        post.fields.language !== currentPost.fields.language
      ) {
        translatedPosts.push({
          slug: post.frontmatter.slug,
          language: post.fields.language,
        });
      }
    });

    createPage({
      path:
        currentPost.fields.language === 'fr'
          ? currentPost.frontmatter.slug
          : `/${currentPost.fields.language}${currentPost.frontmatter.slug}`,
      component: blogPostComponent,
      context: {
        id: currentPost.id,
        previousPostId,
        nextPostId,
        translatedPosts,
      },
    });
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode });

    const regexTranslatedPost = /\/index.(?<language>[a-z]+?)\//;
    const translatedPost = path.match(regexTranslatedPost);

    const language = translatedPost?.groups?.language ?? 'fr';

    createNodeField({
      name: `language`,
      node,
      value: language,
    });

    createNodeField({
      name: `slug`,
      node,
      value:
        language === 'fr'
          ? node.frontmatter.slug
          : `/${language}${node.frontmatter.slug}`,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type siteMetadata {
      author: String
      siteUrl: String
      social: Social
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      articleId: String!
      slug: String!
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      language: String
    }
  `);
};
