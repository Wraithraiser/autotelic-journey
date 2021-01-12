import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { getTranslate } from '../utils/language';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  const avatar = data?.avatar?.childImageSharp?.fixed;
  const translate = getTranslate();

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      <p>
        {translate('bio-author')}{' '}
        <strong>
          <a href={`https://twitter.com/${social.twitter}`}>{author}.</a>
        </strong>
        <br />
        {translate('bio-description')}.
      </p>
    </div>
  );
};

export default Bio;
