import React from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div``;

export const PostContainer = ({ html }) => (
  <StyledDiv className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
)
