import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import styled from 'styled-components';

import './index.scss'
import { THEME } from '../../constants';

const StyledButton = styled.button`
  margin: 10px 0;
  float: right;
  padding: 0;
  appearance: none;
  align-items: center;
  background: transparent;
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
  div:nth-child(1) {
    border: ${({ theme }) => (theme === THEME.LIGHT ? 'none' : '2px solid #78757a')};
    background: #78757a;
    border-radius: 50%;
    height: 24px;
    overflow: ${({ theme }) => (theme === THEME.LIGHT ? 'visible' : 'hidden')};
    position: relative;
    transform: ${({ theme }) => (theme === THEME.LIGHT ? 'scale(0.55)' : 'scale(1)')};
    width: 24px;
    transition: all 0.45s ease 0s;
    &::before {
      content: "";
      height: 24px;
      opacity: 0;
      position: absolute;
      right: -9px;
      top: -9px;
      transform: translate(14px, -14px);
      width: 24px;
      border-radius: 50%;
      transition: transform 0.45s ease 0s;
    }
    &::after {
      box-shadow: 0 -23px 0 #78757a, 0 23px 0 #78757a, 23px 0 0 #78757a, -23px 0 0 #78757a, 15px 15px 0 #78757a, -15px 15px 0 #78757a, 15px -15px 0 #78757a, -15px -15px 0 #78757a;
      content: "";
      height: 8px;
      left: 50%;
      position: absolute;
      top: 50%;
      width: 8px;
      transform: scale(1);
      border-radius: 50%;
      margin: -4px 0px 0px -4px;
      transition: all 0.35s ease 0s;
    }
  }
  div:nth-child(2) {
    height: 24px;
      opacity: 0;
      position: absolute;
      right: 0px;
      top: 0px;
      transform: translate(14px, -14px);
      width: 24px;
      border-radius: 50%;
      border-width: 0px;
      border-style: initial;
      border-color: initial;
      border-image: initial;
      transition: background 0.25s ease 0s, transform 0.45s ease 0s;
  }
`;

// ${({ theme }) => (theme === THEME.LIGHT ? 'black' : 'white')};

export const Top = ({ theme, title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}
      <GitHubIcon />
      <StyledButton theme={theme}>
        <div></div>
        <div></div>
      </StyledButton>
    </div>
  )
}

// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
//   <style>
//     :root {
//       --theme-ui-colors-navigation-socialLink: black
//     }

//     .css {
//       border: 2px solid #78757a;
//       background: #78757a;
//       border-radius: 50%;
//       height: 24px;
//       overflow: hidden;
//       position: relative;
//       transform: scale(1);
//       transition: all 0.45s ease;
//       width: 24px;
//     }

//     .css::before {
//       border-radius: 50%;
//       border: 2px solid #78757a;
//       content: "";
//       height: 24px;
//       opacity: 1;
//       position: absolute;
//       right: -9px;
//       top: -9px;
//       transform: translate(0, 0);
//       transition: transform 0.45s ease;
//       width: 24px;
//     }

//     .css::after {
//       border-radius: 50%;
//       box-shadow: 0 -23px 0 #78757a, 0 23px 0 #78757a, 23px 0 0 #78757a, -23px 0 0 #78757a, 15px 15px 0 #78757a, -15px 15px 0 #78757a, 15px -15px 0 #78757a, -15px -15px 0 #78757a;
//       content: "";
//       height: 8px;
//       left: 50%;
//       margin: -4px 0 0 -4px;
//       position: absolute;
//       top: 50%;
//       width: 8px;
//       -webkit-transform: scale(0);
//       -ms-transform: scale(0);
//       transform: scale(0);
//       -webkit-transition: all 0.35s ease;
//       transition: all 0.35s ease;
//     }

//     .css2 {
//       background: #ffffff;
//       border-radius: 50%;
//       border: 0;
//       height: 24px;
//       opacity: 1;
//       position: absolute;
//       right: 0;
//       top: 0;
//       -webkit-transform: translate(0, 0);
//       -ms-transform: translate(0, 0);
//       transform: translate(0, 0);
//       transition: background 0.25s ease, transform 0.45s ease;
//       width: 24px;
//     }

//     .button {
//       padding: 0;
//       appearance: none;
//       align-items: center;
//       background: transparent;
//       border-radius: 5px;
//       border: 0;
//       cursor: pointer;
//       display: inline-flex;
//       height: 40px;
//       justify-content: center;
//       margin-right: -11px;
//       opacity: 0.75;
//       overflow: hidden;
//       position: relative;
//       transform: scale(0.75);
//       transition: opacity 0.3s ease;
//       vertical-align: middle;
//       width: 40px;
//     }

//     .css3 {
//       background: #78757a;
//       height: 24px;
//       position: relative;
//       transform: scale(0.55);
//       width: 24px;
//       border-radius: 50%;
//       overflow: visible;
//       transition: all 0.45s ease 0s;
//     }

//     .css3::before {
//       /* background: red; */
//       content: "";
//       height: 24px;
//       opacity: 0;
//       position: absolute;
//       right: -9px;
//       top: -9px;
//       transform: translate(14px, -14px);
//       width: 24px;
//       border-radius: 50%;
//       transition: transform 0.45s ease 0s;
//     }

//     .css3::after {
//       /* background: red; */
//       box-shadow: 0 -23px 0 #78757a, 0 23px 0 #78757a, 23px 0 0 #78757a, -23px 0 0 #78757a, 15px 15px 0 #78757a, -15px 15px 0 #78757a, 15px -15px 0 #78757a, -15px -15px 0 #78757a;
//       content: "";
//       height: 8px;
//       left: 50%;
//       position: absolute;
//       top: 50%;
//       width: 8px;
//       transform: scale(1);
//       border-radius: 50%;
//       margin: -4px 0px 0px -4px;
//       transition: all 0.35s ease 0s;
//     }

//     .css4 {
//       height: 24px;
//       opacity: 0;
//       position: absolute;
//       right: 0px;
//       top: 0px;
//       transform: translate(14px, -14px);
//       width: 24px;
//       border-radius: 50%;
//       border-width: 0px;
//       border-style: initial;
//       border-color: initial;
//       border-image: initial;
//       transition: background 0.25s ease 0s, transform 0.45s ease 0s;
//     }
//   </style>
// </head>

// <body>
//   <div>
//     <button class="button">
//       <div class='css'></div>
//       <div class='css2'></div>
//     </button>
//   </div>
//   <div>
//     <button class="button">
//       <div class='css3'></div>
//       <div class='css4'></div>
//     </button>
//   </div>
// </body>

// </html>