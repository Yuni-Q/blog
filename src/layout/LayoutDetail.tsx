import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Top } from '../components/top';
import { useThemeState } from '../context/ThemeContext';
import { rhythm } from '../utils/typography';
import { ChristmasTheme } from './Christmas';
import './index.scss';
import {THEME} from '../constants';
import { createGlobalStyle } from "styled-components"


const navigatorTextColor = '#cc007a';
const navigatorBackgroundColor= '#fceff7';
const darkLightestFontColor = '#fff'
const darkMiddleFontColor = '#d8d7d7';
const darkLightFontColor = '#eeeeee';
const darkCategoryBorderColor = '#384454';
const darkBackgroundColor =  '#282c35';
const darkTextShadow = '0 0 0.1px rgba(255, 255, 255, 0.3)';
const darkLinkColor =  '#9fa8da';
const darkCategoryBackgroundColor = '#24272c';
const darkCategoryItemColor = '#282c35';
const darkCategoryTextColor =  '#d8d7d7';
const darkCategoryHighlightBorderColor =  '#666';
const darkCategoryHighlightTextColor = '#fff';

const lightBackgroundColor =  '#fff';
const lightTextShadow =  '0 0 0.1px rgba(0, 0, 0, 0.3)';
const lightCategoryBorderColor = '#ecf0f2';
const lightCategoryBackgroundColor = '#f4f7f8';

const GlobalStyle = createGlobalStyle`
body {
	transition: background-color .3s,color .3s;
	background-color: ${({theme}) => theme === THEME.LIGHT ? lightBackgroundColor : darkBackgroundColor};
	text-shadow: ${({theme}) => theme === THEME.LIGHT ? lightTextShadow : darkTextShadow};
	color: ${({theme}) => theme === THEME.LIGHT ? 'inherit' : darkLightFontColor};

	.home-header {
		color: ${({theme}) => theme === THEME.LIGHT ? '#333' : darkLightFontColor};
	}

	.bio {
		.author-name-content {
			background-color: ${({theme}) => theme === THEME.LIGHT ? lightCategoryBorderColor : darkCategoryBorderColor};
		}
		.author-introduction {
			color: ${({theme}) => theme === THEME.LIGHT ? '#7d7d7d' : darkMiddleFontColor};
		}
		a {
			color: ${({theme}) => theme === THEME.LIGHT ?'#000080' : darkLinkColor};
		}
	}

	.category-container {
		border-top: 1px solid ${({theme}) => theme === THEME.LIGHT ? lightCategoryBorderColor : darkCategoryBorderColor};
		border-bottom: 1px solid ${({theme}) => theme === THEME.LIGHT ? lightCategoryBorderColor : darkCategoryBorderColor};
		border-right: 6px solid ${({theme}) => theme === THEME.LIGHT ? lightCategoryBorderColor : darkCategoryBorderColor};
		border-left: 6px solid ${({theme}) => theme === THEME.LIGHT ? lightCategoryBorderColor : darkCategoryBorderColor};
		background-color: ${({theme}) => theme === THEME.LIGHT ? lightCategoryBackgroundColor : darkCategoryBackgroundColor};
		.item {
			border: 1px solid ${({theme}) => theme === THEME.LIGHT ? lightCategoryBorderColor : darkCategoryBorderColor};
			background-color: ${({theme}) => theme === THEME.LIGHT ? '#fff' : darkCategoryItemColor};
			-webkit-box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.1);
			box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.1);
			a {
				color: ${({theme}) => theme === THEME.LIGHT ? '#666' : darkCategoryTextColor};
			}
			&[aria-selected='true'] {
				border: 2px solid ${({theme}) => theme === THEME.LIGHT ? '#909da1' : darkCategoryHighlightBorderColor};
				font-weight: bolder;
			}
			&[aria-selected='true'] a {
				color: ${({theme}) => theme === THEME.LIGHT ? '#636c6e' : darkCategoryHighlightTextColor};
			}
		}
	}

	.thumbnail {
		h3 {
			color: ${({theme}) => theme === THEME.LIGHT ? '#333' : darkLightFontColor};
		}
		p {
			color: ${({theme}) => theme === THEME.LIGHT ? '#7d7d7d' : darkMiddleFontColor};
		}
	}

	.footer {
		color: ${({theme}) => theme === THEME.LIGHT ? '#aaa' : darkMiddleFontColor};
		a {
			color: ${({theme}) => theme === THEME.LIGHT ? '#333' : darkLightestFontColor};
		}
	}

	blockquote {
		border-left: ${({theme}) => theme === THEME.LIGHT ? 'none' : '4px solid rgba(255, 255, 255, 0.822)'};
	}

	h1,
	h2 {
		border-bottom-color: ${({theme}) => theme === THEME.LIGHT ? '#none' : 'rgba(255, 255, 255, 0.3)'};
	}

	.navigator {
		a {
			background-color: ${({theme}) => theme === THEME.LIGHT ? '#fceft7' : navigatorBackgroundColor};
			color: ${({theme}) => theme === THEME.LIGHT ? '#cc007a' : navigatorTextColor};
		}
	}
}
`;


export const LayoutDetail = ({ location, title, children }) => {
	const rootPath = '/';
	const state = useThemeState();
	return (
		<>
		<GlobalStyle theme={state.theme} />
			<ChristmasTheme checked={state.snow}>
				<Top
					theme={state.theme}
					title={'yuni-q 블로그'}
					location={location}
					rootPath={rootPath}
				/>
				<div
					style={{
						marginLeft: `auto`,
						marginRight: `auto`,
						maxWidth: rhythm(24),
						padding: `${rhythm(1.5)} ${rhythm(2)}`,
					}}
				>
					{title && <Header title={title} location={location} rootPath={rootPath} />}
					{children}
					<Footer />
				</div>
			</ChristmasTheme>
			</>
	);
};
