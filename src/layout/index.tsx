import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LayoutDetail } from './LayoutDetail';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <ThemeProvider>
      <LayoutDetail title={title}>{children}</LayoutDetail>
    </ThemeProvider>
  );
};
