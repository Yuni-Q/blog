---
title: jest
date: 2022-02-07 11:02:82
category: frontend
tags: []
draft: true
---

## jest.config.js

```js
module.exports = {
  setupFilesAfterEnv: ['jest-plugin-context/setup', '@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  globals: {
    PROFILE: true,
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '.*.(css|scss)$': 'identity-obj-proxy',
    '\\.(gif|png|jpg|svg)$': '<rootDir>/src/mediaFileTransformer.js',
  },
};

```

## mediaFileTransformer.js 

```js
import path from 'path';

// Mocks every media file to return its filename. Makes it possible to test that
// the correct images are loaded for components.

module.exports = { process: (_, filename) => `module.exports = '${JSON.stringify(path.basename(filename))}';` };
```