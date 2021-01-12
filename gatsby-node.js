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
              slug
              keyLanguage
            }
            frontmatter {
              articleId
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
      post.fields.keyLanguage === 'en'
        ? englishPosts.push(post)
        : defaultFrenchPosts.push(post);
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
        post.fields.keyLanguage !== currentPost.fields.keyLanguage
      ) {
        translatedPosts.push({
          slug: post.fields.slug,
          keyLanguage: post.fields.keyLanguage,
        });
      }
    });

    createPage({
      path: currentPost.fields.slug,
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
    const value = createFilePath({ node, getNode });
    const keyLanguage = value.split('/');
    const defaultKeyLanguage = 'fr';
    const slugWithKeyLanguage = keyLanguage.length === 4;

    createNodeField({
      name: `keyLanguage`,
      node,
      value: slugWithKeyLanguage ? keyLanguage[1] : defaultKeyLanguage,
    });

    createNodeField({
      name: `slug`,
      node,
      value,
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
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      keyLanguage: String
    }
  `);
};
