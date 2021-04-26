import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { THEME } from '../../constants';
import { useThemeState } from '../../context/ThemeContext';
import { TARGET_CLASS } from '../../utils/visible';
import './index.scss';
import sendGAEvent, { GA_ACTION } from '../../utils/ga';

const StyledLink = styled(Link)`
  display: inline-block;
  border-radius: 8px;
  margin-right: 8px;
  padding: 4px;
  color: ${({ theme }) => (theme === THEME.LIGHT ? '#000080' : '#9fa8da')};
`;

const StyledThumbnailItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: inherit;
  margin-bottom: 24px;
  box-shadow: ${({ theme }) =>
    theme === THEME.LIGHT
      ? '0 5px 22px 4px rgba(236, 238, 242, 0.5), 0 8px 16px 0 rgba(236, 238, 242, 0.5)'
      : '0 5px 22px 4px rgba(10, 10, 10, 0.3), 0 8px 16px 0 rgba(10, 10, 10, 0.3)'};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme === THEME.LIGHT ? '#F8F9FA' : '#212329'};
  }
  @media (max-width: 800px) {
    &:hover {
      background-color: inherit;
    }
  }
`;

export const ThumbnailItem = ({ node }) => {
  const state = useThemeState();
  return (
    <StyledThumbnailItem theme={state.theme}>
      <Link
        className={`thumbnail ${TARGET_CLASS} `}
        to={node.fields.slug}
        onClick={() => {
          sendGAEvent(
            'thumbnail',
            GA_ACTION.CLICK,
            node.frontmatter.title || node.fields.slug,
          );
        }}
      >
        <div key={node.fields.slug}>
          <h3>{node.frontmatter.title || node.fields.slug}</h3>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      </Link>
      <div>
        {(node.frontmatter.tags || []).map((tag, index) => (
          <StyledLink
            theme={state.theme}
            key={index}
            to={`/tags/${tag}/`}
            onClick={() => {
              sendGAEvent('tag', GA_ACTION.CLICK, tag);
            }}
          >
            {`#${tag}`}
          </StyledLink>
        ))}
      </div>
    </StyledThumbnailItem>
  );
};
