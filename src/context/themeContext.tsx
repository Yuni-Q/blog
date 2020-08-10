import React, { createContext, useState } from 'react';
// Context에서 관리해줄 상태값과 메소드들을 정의합니다.
const ThemeContext = createContext({
  state: {
    theme: 'dark',
  },
  actions: {
    setTheme: () => { },
  }
});

// Provider를 rendering하면서 상태값과 메소드들을 전달합니다.
const ThemeProvider: React.FC<any> = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const value = {
    state: { theme },
    actions: { setTheme }
  };
  return (
    <ThemeContext.Provider value={[value.state, value.actions]}>
      {children}
    </ThemeContext.Provider>
  );
};
const ThemeConsumer = ThemeContext.Consumer;
export { ThemeProvider, ThemeConsumer };
export default ThemeContext;