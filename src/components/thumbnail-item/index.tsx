import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import { TARGET_CLASS } from '../../utils/visible';
import styled from 'styled-components';
import './index.scss';
import { useThemeState } from '../../context/ThemeContext';
import { THEME } from '../../constants';

const StlyedLink = styled(Link)`
	display: inline-block;
	border-radius: 8px;
	border: 3px solid
		${({ theme }) => (theme === THEME.LIGHT ? 'black' : 'white')};
	margin-right: 8px;
	padding: 4px;
	color: ${({ theme }) => (theme === THEME.LIGHT ? '#000080' : '#9fa8da')};
`;

const StyledThumbnailItem = styled.div`
	padding: 16px;
  border-radius: 8px;
	background-color: $white;
	margin-bottom: 16px;
	box-shadow: 0 5px 22px 4px rgba(236, 238, 242, 0.5),
		0 8px 16px 0 rgba(236, 238, 242, 0.5);
	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => (theme === THEME.LIGHT ? '#F8F9FA' : '#212329')};
	}
`;

export const ThumbnailItem = ({ node }) => {
	const state = useThemeState();
	return (
		<StyledThumbnailItem theme={state.theme}>
			<Link className={`thumbnail ${TARGET_CLASS} `} to={node.fields.slug}>
				<div key={node.fields.slug}>
					<h3>{node.frontmatter.title || node.fields.slug}</h3>
					<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
				</div>
			</Link>
			<div>
				{(node.frontmatter.tags || []).map((tag, index) => (
					<StlyedLink
						theme={state.theme}
						key={index}
						to={`/tags/${_.kebabCase(tag)}/`}
					>
						{`#${tag}`}
					</StlyedLink>
				))}
			</div>
		</StyledThumbnailItem>
	);
};
