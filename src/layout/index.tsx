import React, { useEffect, useState } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { SnowSwitch } from '../components/snow-switch';
import { ThemeSwitch } from '../components/theme-switch';
import { Top } from '../components/top';
import { THEME, SNOW } from '../constants';
import * as Dom from '../utils/dom';
import { rhythm } from '../utils/typography';
import { ChristmasTheme } from './Christmas';
import { useThemeState, useThemeDispatch } from '../context/ThemeContext';
import { ThemeProvider } from '../context/ThemeContext';
import { LayoutDetail } from './LayoutDetail'


export const Layout = ({ location, title, children }) => {
	return (
		<ThemeProvider>
			<LayoutDetail location={location} title={title}>
				{children}
			</LayoutDetail>
		</ThemeProvider>
	)
};
