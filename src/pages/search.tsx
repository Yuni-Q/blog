import React, { useEffect, useState } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import { Layout } from '../layout/index';
import { Head } from '../components/head/index';
import { CATEGORY_TYPE, HOME_TITLE } from '../constants/index';
import { Bio } from '../components/bio/index';
import { Ins } from './index';
import { Contents } from '../components/contents/index';
import * as IOManager from '../utils/visible';

const Search = (props) => {
  const emptyQuery = '';

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  });

  const handleInputChange = (event) => {
    const query = event.target.value;
    const { data } = props;
    const posts = data.allMarkdownRemark.edges || [];

    const filteredData = posts.filter((post) => {
      const { html, frontmatter } = post.node;
      const { category, title, tags, draft } = frontmatter;

      return (
        (html && html.toLowerCase().includes(query.toLowerCase())) ||
        (category && category.toLowerCase().includes(query.toLowerCase())) ||
        (title && title.toLowerCase().includes(query.toLowerCase())) ||
        (tags && tags.join('').toLowerCase().includes(query))
      );
    });

    setState({
      query,
      filteredData,
    });
  };

  useEffect(() => {
    IOManager.init();
  }, [state]);

  const { data } = props;
  const { siteMetadata } = data.site;
  const { query, filteredData } = state;
  const hasSearchResults = filteredData && query !== emptyQuery;
  const posts = hasSearchResults ? filteredData : [];

  return (
    <Layout>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <input
        className="form-control form-control-sm ml-3 w-75"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={handleInputChange}
      />
      <div style={{ marginBottom: 24 }}>
        <Ins
          className="adsbygoogle"
          data-ad-client="ca-pub-2667251850399676"
          data-ad-slot="4831328462"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></Ins>
      </div>
      {posts.length === 0 && <div>검색 결과가 없습니다.</div>}
      {posts.length > 0 && (
        <Contents
          posts={posts}
          countOfInitialPost={posts.length}
          count={posts.length}
          category={CATEGORY_TYPE.ALL}
        />
      )}
    </Layout>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            keywords
            title
            configs {
              countOfInitialPost
            }
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            frontmatter: { category: { ne: null }, draft: { eq: false } }
          }
        ) {
          edges {
            node {
              html
              excerpt(pruneLength: 200, truncate: true)
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                category
                tags
                draft
              }
            }
          }
        }
      }
    `}
    render={(data) => <Search data={data} {...props} />}
  />
);
