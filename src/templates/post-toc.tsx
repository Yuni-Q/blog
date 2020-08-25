import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useThemeState} from '../context/ThemeContext';
import ScrollSpy from './scroll-spy';
import {THEME} from '../constants';

const StyledToc = styled.aside`
order: 1;
width: 240px;
position: fixed;
max-height: 90vh;
overflow-y: scroll;
top: 68px;
right: 32px;
@media (max-width: 1200px) {
	display: none;
}

.post-toc {
	z-index: 10;
	ul {
		padding-left: 16px;
		list-style: none;
		margin: 0;
		li {
			margin-bottom: 4px;
			p {
				margin: 0;
			}
			a {
				text-decoration: none;
				color: ${({theme}) => theme === THEME.LIGHT ? '#fff' : '#3d3d3f'};
				font-size: 14px;
				&:hover,
				&:focus {
					color: ${({theme}) => theme=== THEME.LIGHT ? '#212329' : '#F8F9FA'};
				}
				&.active {
					color: ${({theme}) => theme=== THEME.LIGHT ? '#212329' : '#F8F9FA'};
				}
			}
		}
	}
}
`;

export default ({tableOfContents}) => {
  useEffect(() => {
		const content = document.querySelector(".post-content")
    const headings = Array.from(
      content.querySelectorAll("h1,h2,h3,h4,h5,h6")
		).filter((h: HTMLElement) => h.id)
    const toc = document.querySelector(".post-toc")
    new ScrollSpy(toc as HTMLElement, headings as HTMLElement[])
	}, []);

  const state = useThemeState();
  return (
  <StyledToc theme={state.theme}>
				<div className="post-toc" dangerouslySetInnerHTML={{__html: tableOfContents}} />
    </StyledToc>
  )
}