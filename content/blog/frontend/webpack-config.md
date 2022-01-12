---
title: webpack config
date: 2022-01-11 23:01:16
category: frontend
tags: []
draft: true
---

## common

```js
import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import TerserPlugin from 'terser-webpack-plugin';
import webpack, { EnvironmentPlugin } from 'webpack';

import { Config } from '../src/utils/Config';

function getEnvFile() {
  if (Config.isMajor) {
    return './config/.env.production';
  }
  if (Config.isDev) {
    return './config/.env.development';
  }
  return './config/.env.beta';
}

console.log('ENV', Config.ENV);
console.log('DIST_TARGET', Config.DIST_TARGET);

export const common: any = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [path.join(__dirname, '../src'), path.join(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s(x?)$/,
        include: [path.resolve('src')],
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
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|ico|pdf)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[contenthash]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: getEnvFile(),
    }),
    new EnvironmentPlugin({
      PROFILE: Config.ENV,
      SHOW_SAFE_AREA: process.env.SHOW_SAFE_AREA ?? false,
      DIST_TARGET: Config.DIST_TARGET || 'beta',
    }),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin(`Build Date: ${new Date().toLocaleString()}`),
  ].filter(Boolean),
};
```

## dev

```js
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { common } from './webpack.common';

export default {
  ...common,
  target: 'web',
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    ...common.plugins,
    new HtmlWebpackPlugin({
      template: 'public/index.dev.html',
    }),
  ],
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    port: 8081,
    proxy: {},
  },
};
```

## prod

```js
import path from 'path';

import SentryWebpackPlugin from '@sentry/webpack-plugin';
import gitHash from 'git-rev-sync';
import webpack from 'webpack';

import { Config } from '../src/utils/Config';

import { common } from './webpack.common';

const TerserPlugin = require('terser-webpack-plugin');

const banner = require('./banner');

const SENTRY_PREFIX = ''


const publicPath = ''

export default {
  ...common,
  mode: 'production',
  devtool: false,
  entry: { bundle: path.join(__dirname, '../src/index') },
  output: {
    filename: '[name].js',
    path: path.resolve('build'),
    publicPath,
    chunkFilename: '[name].js?ver=[chunkhash]',
    assetModuleFilename: '[path][name][ext]?ver=[hash]',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: Config.isMajor,
          },
          output: {
            comments: false,
            preamble: `/* ${banner()} */`,
          },
        },
        extractComments: false,
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'bundle.vendors',
          test: /\.js$/,
        },
      },
    },
  },
  plugins: [
    ...common.plugins,
    new webpack.SourceMapDevToolPlugin({
      filename: `[name].map`,
      append: `\n// //# sourceMappingURL=${SENTRY_PREFIX}[url]`,
    }),
    new SentryWebpackPlugin({
      authToken: '-',
      org: '-',
      project: '-',
      include: 'build',
      ignore: ['node_modules', 'config'],
      release: gitHash.short(),
      urlPrefix: SENTRY_PREFIX,
      deploy: {
        env: Config.ENV,
      },
    }),
  ],
};
```