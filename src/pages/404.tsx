import { graphql } from 'gatsby';
import React from 'react';
import { Head } from '../components/head';
import { Layout } from '../layout';

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const NotFoundPage: React.VFC<Props> = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <Head title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
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
