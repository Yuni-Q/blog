import React from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`
  ul {
    list-style-type: none;
  }
`;

export const PostContainer = ({ html }) => (
  <StyledDiv className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
)
