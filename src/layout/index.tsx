import React, { useEffect } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LayoutDetail } from './LayoutDetail';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ title, children }) => {
  useEffect(() => {
    if (!document.querySelector('#adsense')) {
      const adsense = document.createElement('script');
      adsense.id = 'adsense';
      adsense.async = true;
      adsense.dataset.adClient = 'ca-pub-2667251850399676';
      adsense.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      if (document.head) document.head.appendChild(adsense);
    }
  });
  return (
    <ThemeProvider>
      <LayoutDetail title={title}>{children}</LayoutDetail>
    </ThemeProvider>
  );
};
