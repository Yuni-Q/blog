---
title: react-refresh
date: 2021-05-07 14:05:82
category: frontend
tags: []
draft: true
---

## 패키지 설치

```zsh
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

## 프로젝트 초기에 적용되다가 중간에 적용이 멈췄던 문제

- webpack 설정에서 `target: 'web'` 추가로 해결했습니다.

## 전체 코드

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-runtime',
    process.env.REACT_REFRESH && require.resolve('react-refresh/babel'),
  ].filter(Boolean),
};
```

```js
// webpack.js
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: {
    app: ['./src/index.tsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve('src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|ico|pdf)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?ver=[hash]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    process.env.REACT_REFRESH && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
```

## [TROUBLESHOOTING](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md)
