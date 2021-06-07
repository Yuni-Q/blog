import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { Bio } from '../components/bio';
import { Disqus } from '../components/disqus';
import * as Elements from '../components/elements';
import { Head } from '../components/head';
import { PostContainer } from '../components/post-container';
import { PostNavigator } from '../components/post-navigator';
import { PostTitle } from '../components/post-title';
import { SocialShare } from '../components/social-share';
import { SponsorButton } from '../components/sponsor-button';
import { Utterences } from '../components/utterances';
import { Layout } from '../layout';
import '../styles/code.scss';
import sendGAEvent, { GA_ACTION } from '../utils/ga';
import * as ScrollManager from '../utils/scroll';
import PostToc from './post-toc';

export default ({ data, pageContext, location }) => {
  useEffect(() => {
    sendGAEvent('blog-post', GA_ACTION.EXPOSE, post.frontmatter.title);
    ScrollManager.init();
    return () => ScrollManager.destroy();
  }, []);

  const post = data.markdownRemark;
  const { tableOfContents } = post;
  const metaData = data.site.siteMetadata;
  const { title, comment, siteUrl, author, sponsor } = metaData;
  const { disqusShortName, utterances } = comment;

  useEffect(() => {
    if (document.querySelector('#adFit')) {
      const prevAdFit = document.querySelector('#adFit');
      if (document.body) document.body.removeChild(prevAdFit);
    }
    const adFit = document.createElement('script');
    adFit.id = 'adFit';
    adFit.async = true;
    adFit.type = 'text/javascript';
    adFit.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
    if (document.body) document.body.appendChild(adFit);
  });

  return (
    <Layout location={location}>
      <Head title={post.frontmatter.title} description={post.excerpt} />
      <PostTitle title={post.frontmatter.title} />

      <PostToc tableOfContents={tableOfContents} />
      <PostContainer html={post.html} />
      <SocialShare title={post.frontmatter.title} author={author} />
      {!!sponsor.buyMeACoffeeId && (
        <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
      )}
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-tzy6JQMnGdkMHytZ"
        data-ad-width="320"
        data-ad-height="50"
      ></ins>
      <Elements.Hr />
      <Bio />
      <PostNavigator pageContext={pageContext} />
      {!!disqusShortName && (
        <Disqus
          post={post}
          shortName={disqusShortName}
          siteUrl={siteUrl}
          slug={pageContext.slug}
        />
      )}
      {!!utterances && <Utterences repo={utterances} />}
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
