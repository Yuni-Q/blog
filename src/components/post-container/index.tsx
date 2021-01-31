import React from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`
  hr {
    display: none;
  }
`;

export const PostContainer = ({ html }) => (
  <StyledDiv className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
)
