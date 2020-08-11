import React from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Top } from '../components/top';
import { useThemeState } from '../context/ThemeContext';
import { rhythm } from '../utils/typography';
import { ChristmasTheme } from './Christmas';
import './index.scss';

export const LayoutDetail = ({ location, title, children }) => {
	const rootPath = '/';
	const state = useThemeState();

	return (
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
				<Header title={title} location={location} rootPath={rootPath} />
				{children}
				<Footer />
			</div>
		</ChristmasTheme>
	);
};
