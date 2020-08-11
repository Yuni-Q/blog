import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LayoutDetail } from './LayoutDetail';


export const Layout = ({ location, title, children }) => {
	return (
		<ThemeProvider>
			<LayoutDetail location={location} title={title}>
				{children}
			</LayoutDetail>
		</ThemeProvider>
	)
};
