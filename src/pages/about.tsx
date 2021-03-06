import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import * as Lang from '../constants';
import sendGAEvent, { GA_ACTION } from '../utils/ga';
import { rhythm } from '../utils/typography';

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: { frontmatter: { lang: string }; html: string } }[];
    };
  };
}

const About: React.VFC<Props> = ({ data }) => {
  useEffect(() => {
    sendGAEvent('resume', GA_ACTION.EXPOSE, 'resume');
  }, []);
  const resumes = data.allMarkdownRemark.edges;

  const resume = resumes
    .filter(({ node }) => node.frontmatter.lang === Lang.KOREAN)
    .map(({ node }) => node)[0];

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
          3 / 4,
        )}`,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: resume.html }} />
    </div>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`;
export default About;
