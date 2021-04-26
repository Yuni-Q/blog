import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { SNOW, THEME } from '../../constants';
import { useThemeDispatch, useThemeState } from '../../context/ThemeContext';
import sendGAEvent, { GA_ACTION } from '../../utils/ga';
import { GitHubIcon } from '../social-share/github-icon';
import './index.scss';

const StyledButton = styled.button<{ theme: string; snow: string }>`
  outline: 0;
  background: #fff;
  margin: 10px 0;
  float: right;
  padding: 0;
  appearance: none;
  align-items: center;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  justify-content: center;
  opacity: 0.75;
  overflow: hidden;
  position: relative;
  transform: scale(0.75);
  transition: opacity 0.3s ease;
  vertical-align: middle;
  width: 40px;
  &:hover {
    background: black;
  }
  @media (max-width: 800px) {
    &:hover {
      background: #fff;
    }
  }
  .theme1 {
    border: ${({ theme }) =>
      theme === THEME.LIGHT ? 'none' : '2px solid #78757a'};
    border-radius: 50%;
    height: 24px;
    overflow: ${({ theme }) => (theme === THEME.LIGHT ? 'visible' : 'hidden')};
    position: relative;
    transform: ${({ theme }) =>
      theme === THEME.LIGHT ? 'scale(0.55)' : 'scale(1)'};
    width: 24px;
    transition: all 0.45s ease 0s;
    background: #78757a;
    &::before {
      border-radius: 50%;
      border: ${({ theme }) =>
        theme === THEME.LIGHT ? 'none' : '2px solid #78757a'};
      content: '';
      height: 24px;
      opacity: ${({ theme }) => (theme === THEME.LIGHT ? 0 : 1)};
      position: absolute;
      right: -9px;
      top: -9px;
      transform: ${({ theme }) =>
        theme === THEME.LIGHT ? 'translate(14px, -14px)' : 'translate(0, 0)'};
      transition: transform 0.45s ease 0s;
      width: 24px;
    }
    &::after {
      border-radius: 50%;
      box-shadow: 0 -23px 0 #78757a, 0 23px 0 #78757a, 23px 0 0 #78757a,
        -23px 0 0 #78757a, 15px 15px 0 #78757a, -15px 15px 0 #78757a,
        15px -15px 0 #78757a, -15px -15px 0 #78757a;
      content: '';
      height: 8px;
      left: 50%;
      margin: -4px 0px 0px -4px;
      position: absolute;
      top: 50%;
      width: 8px;
      transform: ${({ theme }) =>
        theme === THEME.LIGHT ? 'scale(1)' : 'scale(0)'};
      transition: all 0.35s ease 0s;
    }
  }
  .theme2 {
    background: ${({ theme }) => (theme === THEME.LIGHT ? 'none' : 'inherit')};
    border-radius: 50%;
    border: 0;
    height: 24px;
    opacity: ${({ theme }) => (theme === THEME.LIGHT ? 0 : 1)};
    position: absolute;
    right: 0;
    top: 0;
    transform: ${({ theme }) =>
      theme === THEME.LIGHT ? 'translate(14px, -14px)' : 'translate(0, 0)'};
    transition: opacity 0.25s ease 0s, transform 0.45s ease 0s;
    width: 24px;
  }
  &:hover {
    .theme1 {
      background: #fff;
      border: ${({ theme }) =>
        theme === THEME.LIGHT ? 'none' : '2px solid #fff'};
      &::before {
        border-radius: 50%;
        border: ${({ theme }) =>
          theme === THEME.LIGHT ? 'none' : '2px solid #fff'};
      }
      &::after {
        border-radius: 50%;
        box-shadow: 0 -23px 0 #fff, 0 23px 0 #fff, 23px 0 0 #fff, -23px 0 0 #fff,
          15px 15px 0 #fff, -15px 15px 0 #fff, 15px -15px 0 #fff,
          -15px -15px 0 #fff;
      }
    }
    .snow {
      fill: ${({ snow }) => (snow === SNOW.ON ? '#FFCAEF' : '#fff')};
    }
    .github {
      color: #fff;
    }
  }
  @media (max-width: 800px) {
    &:hover {
      .theme1 {
        background: #78757a;
        border: ${({ theme }) =>
          theme === THEME.LIGHT ? 'none' : '2px solid #78757a'};
        &::before {
          border-radius: 50%;
          border: ${({ theme }) =>
            theme === THEME.LIGHT ? 'none' : '2px solid #78757a'};
        }
        &::after {
          border-radius: 50%;
          box-shadow: 0 -23px 0 #78757a, 0 23px 0 #78757a, 23px 0 0 #78757a,
            -23px 0 0 #78757a, 15px 15px 0 #78757a, -15px 15px 0 #78757a,
            15px -15px 0 #78757a, -15px -15px 0 #78757a;
        }
      }
      .snow {
        fill: ${({ snow }) => (snow === SNOW.ON ? '#FFCAEF' : '#78757a')};
      }
      .github {
        color: #78757a;
      }
    }
  }
`;

const StyledSvg = styled.svg<{ snow: string }>`
  transition: all 0.3s ease;
  width: 28px;
  fill: ${({ snow }) => (snow === SNOW.ON ? '#FFCAEF' : '#78757a')};
`;

export const Top = ({ theme }) => {
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

  return (
    <div className="top">
      <Link
        to={`/`}
        className="link"
        onClick={() => {
          sendGAEvent('button', GA_ACTION.CLICK, '/');
        }}
      >
        {`Yuni-Q`}
      </Link>
      <StyledButton theme={theme} snow={state.snow} onClick={() => {}}>
        <GitHubIcon />
      </StyledButton>
      <StyledButton
        theme={theme}
        snow={state.snow}
        onClick={() => {
          sendGAEvent('button', GA_ACTION.CLICK, 'theme');
          setTheme();
        }}
      >
        <div className="theme1" />
        <div className="theme2" />
      </StyledButton>
      <StyledButton
        theme={theme}
        snow={state.snow}
        onClick={() => {
          sendGAEvent('button', GA_ACTION.CLICK, 'snow');
          setSnow();
        }}
      >
        <StyledSvg
          className="snow"
          snow={state.snow}
          version="1.1"
          id="레이어_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 23.9 22.9"
        >
          <path
            d="M23.9,10c0-0.3-0.2-0.5-0.4-0.6l-1.1-0.3C22.1,9.1,22,9,21.9,8.8c-0.1-0.2,0-0.4,0.1-0.6l0.8-0.9
						c0.2-0.2,0.2-0.5,0-0.7c-1.2-1.4-3.1-2-5-1.4c-0.4,0.1-0.9,0.4-1.4,0.7c0.1-0.6,0.2-1.1,0.2-1.6c0-1.9-1.2-3.6-2.9-4.3
						c-0.2-0.1-0.5,0-0.7,0.2l-0.6,1c-0.1,0.2-0.3,0.3-0.5,0.3c-0.2,0-0.4-0.1-0.5-0.3l-0.6-1C10.7,0,10.4-0.1,10.2,0
						C8.5,0.7,7.3,2.4,7.3,4.3c0,0.5,0.1,1,0.2,1.6C7,5.6,6.5,5.4,6.1,5.2c-1.8-0.6-3.8,0-5,1.4c-0.2,0.2-0.2,0.5,0,0.7l0.8,0.9
						C2,8.4,2.1,8.6,2,8.8c0,0.2-0.2,0.3-0.4,0.4L0.4,9.5C0.2,9.5,0,9.8,0,10c0.1,1.8,1.4,3.5,3.2,4c0.4,0.1,1,0.2,1.5,0.3
						c-0.4,0.4-0.8,0.8-1.1,1.1c-1.1,1.6-1.2,3.6-0.2,5.2c0.1,0.2,0.4,0.3,0.7,0.2l1.1-0.4c0.2-0.1,0.4-0.1,0.6,0C6,20.6,6,20.8,6,21.1
						l-0.1,1.2c0,0.3,0.2,0.5,0.4,0.6c1.8,0.4,3.7-0.2,4.8-1.8c0.3-0.4,0.5-0.8,0.8-1.4c0.2,0.5,0.5,1,0.8,1.4c1.1,1.6,3.1,2.2,4.8,1.8
						c0.3-0.1,0.4-0.3,0.4-0.6l-0.1-1.2c0-0.3,0.1-0.4,0.2-0.5c0.1-0.1,0.3-0.1,0.6,0l1.1,0.4c0.2,0.1,0.5,0,0.7-0.2
						c1-1.6,0.9-3.6-0.2-5.2c-0.3-0.4-0.6-0.8-1.1-1.1c0.6-0.1,1.1-0.2,1.5-0.3C22.6,13.5,23.8,11.8,23.9,10z M14.1,12.8
						c0.3-0.2,0.7-0.3,1.1-0.1c0.4,0.3,0.6,0.8,0.3,1.3c-0.3,0.4-0.8,0.6-1.3,0.3c-0.3-0.2-0.5-0.6-0.4-1l-1.4-0.8v1.6
						c0.4,0.1,0.6,0.5,0.6,0.9c0,0.5-0.4,0.9-0.9,0.9c-0.5,0-0.9-0.4-0.9-0.9c0-0.4,0.3-0.7,0.6-0.9v-1.6l-1.4,0.8c0.1,0.4-0.1,0.8-0.4,1
						c-0.4,0.3-1,0.1-1.3-0.3c-0.3-0.4-0.1-1,0.3-1.3c0.3-0.2,0.8-0.1,1.1,0.1l1.4-0.8L10,11.1c-0.3,0.2-0.7,0.3-1.1,0.1
						C8.5,11,8.3,10.4,8.6,10c0.3-0.4,0.8-0.6,1.3-0.3c0.3,0.2,0.5,0.6,0.4,1l1.4,0.8V9.8c-0.4-0.1-0.6-0.5-0.6-0.9C11.1,8.4,11.5,8,12,8
						c0.5,0,0.9,0.4,0.9,0.9c0,0.4-0.3,0.7-0.6,0.9v1.6l1.4-0.8c-0.1-0.4,0.1-0.8,0.4-1c0.4-0.3,1-0.1,1.3,0.3c0.3,0.4,0.1,1-0.3,1.3
						c-0.3,0.2-0.8,0.1-1.1-0.1l-1.4,0.8L14.1,12.8z"
          />
        </StyledSvg>
      </StyledButton>
      {/*<SnowSwitch checked={state.snow} handleChange={setSnow} />*/}
    </div>
  );
};
