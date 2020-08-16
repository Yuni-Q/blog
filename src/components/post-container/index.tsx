import React from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`
  ul {
    list-style-type: none;
  }
`;

export const PostContainer = ({ html }) => (
  <StyledDiv dangerouslySetInnerHTML={{ __html: html }} />
)
