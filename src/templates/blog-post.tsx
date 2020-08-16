import {graphql} from 'gatsby';
import React,{useEffect} from 'react';
import {Bio} from '../components/bio';
import {Disqus} from '../components/disqus';
import * as Elements from '../components/elements';
import {Head} from '../components/head';
import {PostContainer} from '../components/post-container';
import {PostNavigator} from '../components/post-navigator';
import {PostTitle} from '../components/post-title';
import {SocialShare} from '../components/social-share';
import {SponsorButton} from '../components/sponsor-button';
import {Utterences} from '../components/utterances';
import {Layout} from '../layout';
import '../styles/code.scss';
import sendGAEvent,{GA_ACTION} from '../utils/ga';
import * as ScrollManager from '../utils/scroll';

export default ({ data, pageContext, location }) => {
	useEffect(() => {
		sendGAEvent('blog-post', GA_ACTION.EXPOSE);
		ScrollManager.init();
		return () => ScrollManager.destroy();
	}, []);

	const post = data.markdownRemark;
	const metaData = data.site.siteMetadata;
	const { title, comment, siteUrl, author, sponsor } = metaData;
	const { disqusShortName, utterances } = comment;

	return (
		<Layout location={location}>
			<Head title={post.frontmatter.title} description={post.excerpt} />
			<PostTitle title={post.frontmatter.title} />
			<PostContainer html={post.html} />
			<SocialShare title={post.frontmatter.title} author={author} />
			{!!sponsor.buyMeACoffeeId && (
				<SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
			)}
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
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
			}
		}
	}
`;
