import React from 'react';
import { Link } from 'gatsby';
import { GitHubIcon } from '../social-share/github-icon';
import styled from 'styled-components';

import './index.scss';
import { THEME } from '../../constants';

const StyledButton = styled.button`
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
	div:nth-child(1) {
		border: ${({ theme }) =>
			theme === THEME.LIGHT ? 'none' : '2px solid #78757a'};
		background: #78757a;
		border-radius: 50%;
		height: 24px;
		overflow: ${({ theme }) => (theme === THEME.LIGHT ? 'visible' : 'hidden')};
		position: relative;
		transform: ${({ theme }) =>
			theme === THEME.LIGHT ? 'scale(0.55)' : 'scale(1)'};
		width: 24px;
		transition: all 0.45s ease 0s;
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
	div:nth-child(2) {
		background: ${({ theme }) => (theme === THEME.LIGHT ? 'none' : '#ffffff')};
		border-radius: 50%;
		border: 0;
		height: 24px;
		opacity: ${({ theme }) => (theme === THEME.LIGHT ? 0 : 1)};
		position: absolute;
		right: 0;
		top: 0;
		transform: ${({ theme }) =>
			theme === THEME.LIGHT ? 'translate(14px, -14px)' : 'translate(0, 0)'};
		transition: background 0.25s ease 0s, transform 0.45s ease 0s;
		width: 24px;
	}
`;

export const Top = ({ theme, title, location, rootPath }) => {
	const isRoot = location.pathname === rootPath;
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
	);
};
