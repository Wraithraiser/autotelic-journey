module.exports = {
  siteMetadata: {
    author: `Alexandre Lim`,
    siteUrl: `https://autotelicjourney.com/`,
    social: {
      twitter: `alimcoder`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Un voyage Autotelic`,
        short_name: `Un voyage Autotelic`,
        description: `Juste une aventure humaine parmi tant d'autres.`,
        lang: `fr`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffa7c4`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
        localize: [
          {
            start_url: `/en/`,
            lang: `en`,
            name: `An Autotelic Journey`,
            short_name: `An Autotelic Journey`,
            description: `Just another journey from a human being.`,
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `fr`,
        configPath: require.resolve(`./src/i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./src/i18n/react-i18next`,
        i18nextOptions: {
          debug: true,
          supportedLngs: ['fr', 'en'],
          fallbackLng: 'fr',
          load: 'languageOnly',
          cleanCode: true,
          ns: ['translation'],
        },
      },
    },
  ],
};
