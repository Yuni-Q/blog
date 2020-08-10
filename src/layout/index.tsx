import React, { useEffect, useState } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { SnowSwitch } from '../components/snow-switch';
import { ThemeSwitch } from '../components/theme-switch';
import { Top } from '../components/top';
import { THEME } from '../constants';
import * as Dom from '../utils/dom';
import { rhythm } from '../utils/typography';
import { ChristmasTheme } from './Christmas';
import './index.scss';

function getTheme(checked) {
	return checked ? THEME.DARK : THEME.LIGHT;
}

function canUseDOM() {
	return !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);
}

function toggleTheme(theme) {
	switch (theme) {
		case THEME.LIGHT: {
			Dom.addClassToBody(THEME.LIGHT);
			Dom.removeClassToBody(THEME.DARK);
			break;
		}
		case THEME.DARK: {
			Dom.addClassToBody(THEME.DARK);
			Dom.removeClassToBody(THEME.LIGHT);
			break;
		}
	}
}

export const Layout = ({ location, title, children }) => {
	const rootPath = '/';

	let localStorageTheme = THEME.LIGHT;
	let localStorageSnow = THEME.LIGHT;
	if (!!canUseDOM()) {
		localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme === THEME.DARK) {
			document.documentElement.setAttribute('data-theme', THEME.DARK);
			localStorage.setItem('theme', THEME.DARK);
			localStorageTheme = THEME.DARK;
		}
		localStorageSnow = localStorage.getItem('snow');
		if (localStorageSnow === THEME.DARK) {
			localStorage.setItem('snow', THEME.DARK);
			localStorageSnow = THEME.DARK;
		}
	}

	const [checked, setChecked] = useState(
		localStorageTheme === THEME.DARK ? THEME.DARK : THEME.LIGHT
	);
	const [checkedSnow, setCheckedSnow] = useState(
		localStorageSnow === THEME.DARK ? THEME.DARK : THEME.LIGHT
	);

	useEffect(() => {
		handleChange(checked === THEME.DARK);
		setCheckedSnow(checkedSnow);
	}, []);

	const handleChange = checked => {
		const theme = getTheme(checked);
		setChecked(theme === THEME.DARK ? THEME.DARK : THEME.LIGHT);
		localStorage.setItem('theme', `${theme === THEME.DARK ? THEME.DARK : THEME.LIGHT}`);
		document.documentElement.setAttribute('data-theme', theme === THEME.DARK ? THEME.DARK : THEME.LIGHT);
		toggleTheme(theme);
	};

	const handleChangeSnow = checked => {
		const theme = getTheme(checked);
		setCheckedSnow(theme === THEME.DARK ? THEME.DARK : THEME.LIGHT);
		localStorage.setItem('snow', `${theme === THEME.DARK ? THEME.DARK : THEME.LIGHT}`);
	};

	return (
		<>
			<ChristmasTheme checked={checkedSnow}>
				<Top title={title} location={location} rootPath={rootPath} />
				<div
					style={{
						marginLeft: `auto`,
						marginRight: `auto`,
						maxWidth: rhythm(24),
						padding: `${rhythm(1.5)} ${rhythm(2)}`,
					}}
				>
					<div style={{ display: 'flex ', justifyContent: 'flex-end' }}>
						<SnowSwitch checked={checkedSnow} handleChange={handleChangeSnow} />
						<ThemeSwitch checked={checked} handleChange={handleChange} />
					</div>
					<Header title={title} location={location} rootPath={rootPath} />
					{children}
					<Footer />
				</div>
			</ChristmasTheme>
		</>
	);
};
