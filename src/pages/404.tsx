import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../layout';
import { Head } from '../components/head';
import { ThemeProvider } from '../context/ThemeContext';

interface Props {
	location: string;
	data: {
		site: {
			siteMetadata: {
				title: string;
			};
		};
	};
}

class NotFoundPage extends React.Component<Props> {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;

		return (
			<ThemeProvider>
				<Layout location={this.props.location} title={siteTitle}>
					<Head title="404: Not Found" />
					<h1>Not Found</h1>
					<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
				</Layout>
			</ThemeProvider>
		);
	}
}

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
