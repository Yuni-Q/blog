import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import { TARGET_CLASS } from '../../utils/visible';
import styled from 'styled-components'
import './index.scss';

const StlyedLink = styled(Link)`
	display: inline-block;
	border-radius: 8px;
	border: 3px solid ${({ theme }) => theme === 'light' ? 'black' : 'white'};
	margin-right: 8px;
	padding: 4px;
	color: ${({ theme }) => theme === 'light' ? '#000080' : '#9fa8da'};
`

export const ThumbnailItem = ({ node }) => {
	const [theme, setTheme] = useState('light');
	useEffect(() => {
		if (document.body.className.includes('light')) {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	})
	return (
		<>
			<Link className={`thumbnail ${TARGET_CLASS} `} to={node.fields.slug}>
				<div key={node.fields.slug}>
					<h3>{node.frontmatter.title || node.fields.slug}</h3>

					<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
				</div>
			</Link>
			<div>
				{(node.frontmatter.tags || []).map((tag, index) => (
					<StlyedLink theme={theme} key={index} to={`/ tags / ${_.kebabCase(tag)} /`}>
						{`#${tag}`}
					</StlyedLink >
				))}

			</div >
		</>
	)
};
