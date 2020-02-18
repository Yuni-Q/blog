import React from 'react';

import { Top } from '../components/top';
import { Header } from '../components/header';
import { ThemeSwitch } from '../components/theme-switch';
import { Footer } from '../components/footer';
import { rhythm } from '../utils/typography';
import { ChristmasTheme } from './Christmas';

import './index.scss';

export const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;

	return (
		<>
			<ChristmasTheme>
				<Top title={title} location={location} rootPath={rootPath} />
				<div
					style={{
						padding: `${rhythm(1.5)} ${rhythm(2)}`,
					}}
				>
					<ThemeSwitch />
					<Header title={title} location={location} rootPath={rootPath} />
					{children}
					<Footer />
				</div>
			</ChristmasTheme>
		</>
	);
};
