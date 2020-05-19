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
	const rootPath = `${__PATH_PREFIX__}/`;

	let localStorageTheme = false;
	let localStorageSnow = false;
	if (!!canUseDOM()) {
		localStorageTheme = localStorage.getItem('theme');
		if (!localStorageTheme) {
			localStorage.setItem('theme', 'false');
			localStorageTheme = 'false';
		}
		localStorageSnow = localStorage.getItem('snow');
		if (!localStorageSnow) {
			localStorage.setItem('snow', 'false');
			localStorageSnow = 'false';
		}
	}

	const [checked, setChecked] = useState(
		localStorageTheme === 'true' ? true : false
	);
	const [checkedSnow, setCheckedSnow] = useState(
		localStorageSnow === 'true' ? true : false
	);

	useEffect(() => {
		handleChange(checked);
		setCheckedSnow(checkedSnow);
	}, []);

	const handleChange = checked => {
		const theme = getTheme(checked);
		setChecked(checked);
		localStorage.setItem('theme', `${checked}`);
		toggleTheme(theme);
	};

	const handleChangeSnow = checked => {
		setCheckedSnow(checked);
		localStorage.setItem('snow', `${checked}`);
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
