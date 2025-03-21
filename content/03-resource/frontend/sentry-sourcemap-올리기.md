---
title: sentry sourcemap 올리기
date: 2021-08-10 00:08:87
category: frontend
tags: []
draft: true
---

## 준비

```zsh
npm i @sentry/webpack-plugin git-rev-sync webpack-concat-plugin
```

### 참고사항

- webpack의 splitChunks 기능을 사용할 경우 동작에 이상이 있어서
  webpack의 externals 기능을 이용해서 공통 모듈을 분리해 냅니다.

```ts
// vender 파일
const path = require('path');

const vendors = [
  {
    name: 'React',
    module: 'react',
    path: {
      dev: ['./node_modules/react/umd/react.development.js'],
      prod: ['./node_modules/react/umd/react.production.min.js'],
    },
  },
  {
    name: 'ReactDOM',
    module: 'react-dom',
    path: {
      dev: ['./node_modules/react-dom/umd/react-dom.development.js'],
      prod: ['./node_modules/react-dom/umd/react-dom.production.min.js'],
    },
  },
  {
    name: 'ReactRouterDom',
    module: 'react-router-dom',
    path: {
      dev: ['./node_modules/react-router-dom/umd/react-router-dom.js'],
      prod: ['./node_modules/react-router-dom/umd/react-router-dom.min.js'],
    },
  },
  {
    name: 'axios',
    module: 'axios',
    path: {
      dev: ['./node_modules/axios/dist/axios.js'],
      prod: ['./node_modules/axios/dist/axios.min.js'],
    },
  },
  {
    name: 'mobx',
    module: 'mobx',
    path: {
      dev: ['./node_modules/mobx/lib/mobx.umd.js'],
      prod: ['./node_modules/mobx/lib/mobx.umd.min.js'],
    },
  },
  {
    name: 'mobxReact',
    module: 'mobx-react',
    path: {
      dev: [
        './node_modules/mobx-react-lite/dist/mobxreactlite.umd.development.min.js',
        './node_modules/mobx-react/dist/mobx-react.umd.js',
      ],
      prod: [
        './node_modules/mobx-react-lite/dist/mobxreactlite.umd.production.min.js',
        './node_modules/mobx-react/dist/mobx-react.umd.js',
      ],
    },
  },
];

exports.name = 'bundle.vendors.js';

exports.filesToConcat = (target = 'dev') => {
  return vendors.reduce((acc, vendor) => {
    return [
      ...acc,
      ...vendor.path[target].map((p) => path.resolve(__dirname, p)),
    ];
  }, []);
};

exports.externals = () => {
  return vendors.reduce((acc, vendor) => {
    acc[vendor.name] = vendor.module;
    return acc;
  }, {});
};
```

## webpack 설정

```js
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const gitHash = require('git-rev-sync').short();
const ConcatPlugin = require('webpack-concat-plugin');
const vendors = require('./vendors');

const SENTRY_PREFIX = `~/dist/beta/`;
const publicPath = 'https://yuni-q.com';
const BUILD_FILE_NAME = 'bundle';

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    [serviceId]: [entryFile],
  },
  output: {
    filename: `${BUILD_FILE_NAME}.js`,
    path: path.resolve('build'),
    publicPath,
  },
  resolve: {
    modules: ['./src', './node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: `${BUILD_FILE_NAME}.js.map`,
      append: `\n// //# sourceMappingURL=${SENTRY_PREFIX}[url]`,
    }),
    new ConcatPlugin({
      outputPath: '/',
      fileName: vendors.name,
      filesToConcat: vendors.filesToConcat('prod'),
    }),
    new SentryWebpackPlugin({
      // Settings > Account > API > Auth Tokens에서 생성
      authToken: 'MyToken',
      org: 'MyOrg',
      project: 'MyProject',
      include: 'build',
      ignore: ['node_modules', 'webpack.config.js'],
      release: gitHash,
      urlPrefix: SENTRY_PREFIX,
      deploy: {
        env: 'production',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)s(x?)$/,
        include: [path.resolve('src'), path.resolve('node_modules')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|ico|pdf)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[contenthash]',
        },
      },
    ],
  },
  externals: vendors.externals(),
};
```
