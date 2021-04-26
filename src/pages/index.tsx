import { graphql } from 'gatsby';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Bio } from '../components/bio';
import { Category } from '../components/category';
import { Contents } from '../components/contents';
import { Head } from '../components/head';
import { CATEGORY_TYPE, HOME_TITLE } from '../constants';
import { Layout } from '../layout';
import * as Dom from '../utils/dom';
import * as EventManager from '../utils/event-manager';
import sendGAEvent, { GA_ACTION } from '../utils/ga';
import * as ScrollManager from '../utils/scroll';
import * as Storage from '../utils/storage';
import * as IOManager from '../utils/visible';

// const DEST_POS = 316;
const BASE_LINE = 80;

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos;
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          excerpt: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            category: string;
            date: string;
            draft: boolean;
            tags: string[];
            title: string;
          };
        };
      }[];
    };
    site: {
      siteMetadata: {
        configs: { countOfInitialPost: number };
        keywords: string[];
      };
      title: string;
    };
  };
}

const Index: React.VFC<Props> = ({ data }) => {
  const initialCount = Storage.getCount(1);
  const initialCategory = Storage.getCategory(CATEGORY_TYPE.ALL);
  const [count, setCount] = useState(initialCount);
  const countRef = useRef(count);
  const [category, setCategory] = useState(initialCategory);
  const { siteMetadata } = data.site;
  const { countOfInitialPost } = siteMetadata.configs;
  const posts = data.allMarkdownRemark.edges;
  const categories = _.uniq(posts.map(({ node }) => node.frontmatter.category));

  useEffect(() => {
    sendGAEvent(HOME_TITLE, GA_ACTION.EXPOSE, HOME_TITLE);
    window.addEventListener(`scroll`, onScroll, { passive: false });
    IOManager.init();
    ScrollManager.init();

    return () => {
      window.removeEventListener(`scroll`, onScroll);
      IOManager.destroy();
      ScrollManager.destroy();
    };
  }, []);

  useEffect(() => {
    countRef.current = count;
    IOManager.refreshObserver();
    Storage.setCount(count);
    Storage.setCategory(category);
  });

  useEffect(() => {
    document.querySelector('li[aria-selected=true]').scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'end',
    });
  }, [category]);

  const selectCategory = (category) => {
    setCategory(category);
  };

  const onScroll = () => {
    const currentPos = window.scrollY + window.innerHeight;
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE;
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost;

    return EventManager.toFit(() => setCount((prev) => prev + 1), {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })();
  };

  return (
    <Layout>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Bio />
      <Category
        categories={categories}
        category={category}
        selectCategory={selectCategory}
      />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        category={category}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
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
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
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
`;

export default Index;
