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

import './index.scss';

export const LayoutDetail = ({ location, title, children }) => {
  const rootPath = '/';
  const state = useThemeState();
  const dispatch = useThemeDispatch();
  const setTheme = () =>
    dispatch({
      type: 'SET_THEME',
      theme: state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    });
  const setSnow = () =>
    dispatch({
      type: 'SET_SNOW',
      snow: state.snow === SNOW.ON ? SNOW.OFF : SNOW.ON,
    });
  useEffect(() => {
    const setTheme = () =>
      dispatch({
        type: 'SET_THEME',
        theme: state.theme === THEME.LIGHT ? THEME.LIGHT : THEME.DARK,
      });
    const setSnow = () =>
      dispatch({
        type: 'SET_SNOW',
        snow: state.snow === SNOW.ON ? SNOW.ON : SNOW.OFF,
      });
    setTheme();
    setSnow();
  }, []);

  return (
    <ChristmasTheme checked={state.snow}>
      <Top title={'yuni-q 블로그'} location={location} rootPath={rootPath} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(2)}`,
        }}
      >
        <div style={{ display: 'flex ', justifyContent: 'flex-end' }}>
          <SnowSwitch checked={state.snow} handleChange={setSnow} />
          <ThemeSwitch checked={state.theme} handleChange={setTheme} />
        </div>
        <Header title={title} location={location} rootPath={rootPath} />
        {children}
        <Footer />
      </div>
    </ChristmasTheme>
  );
};
