import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LayoutDetail } from './LayoutDetail';

interface Props {
	location: any;
	title?: string;
	children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ location, title, children }) => {
	return (
		<ThemeProvider>
			<LayoutDetail location={location} title={title}>
				{children}
			</LayoutDetail>
		</ThemeProvider>
	)
};
