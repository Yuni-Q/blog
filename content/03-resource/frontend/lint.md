---
title: lint
date: 2022-02-07 11:02:32
category: frontend
tags: []
draft: true
---

## .eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import', 'unused-imports'],
  // 0 = off, 1 = warning, 2 = error (you passed "3")
  rules: {
    'react/jsx-key': 2,
    semi: 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-unused-vars': 0, // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'arrow-body-style': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'lines-between-class-members': 0,
    'react/no-array-index-key': 0,
    'no-console': 0,
    'no-empty': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'react/display-name': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react/sort-comp': 0,
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,
    'jest/expect-expect': 0,
    'max-len': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
```

## .stylelintrc.js

```js
module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-recommended', 'stylelint-config-styled-components'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      [
        'content',
        {
          groupName: 'animation',
          emptyLineBefore: 'always',
          properties: ['animation', 'transform', 'transform-style', 'transition'],
        },
        {
          groupName: 'position',
          emptyLineBefore: 'always',
          properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
        },
        {
          groupName: 'dimensions',
          emptyLineBefore: 'always',
          properties: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'],
        },
        {
          groupName: 'display',
          emptyLineBefore: 'always',
          properties: ['display'],
        },
        {
          groupName: 'flex',
          properties: [
            'flex-direction',
            'justify-content',
            'align-items',
            'align-self',
            'flex',
            'flex-basis',
            'flex-grow',
            'flex-shrink',
            'flex-wrap',
          ],
        },
        {
          groupName: 'boxModel',
          emptyLineBefore: 'always',
          properties: [
            'box-sizing',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
          ],
        },
        {
          groupName: 'background',
          emptyLineBefore: 'always',
          properties: [
            'background',
            'background-position',
            'background-color',
            'background-image',
            'background-size',
            'background-repeat',
          ],
        },
        {
          groupName: 'border',
          emptyLineBefore: 'always',
          properties: [
            'border',
            'border-radius',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
            'border-collapse',
            'border-spacing',
          ],
        },
        {
          groupName: 'font',
          emptylineBefore: 'always',
          properties: [
            'color',
            'font',
            'font-family',
            'font-style',
            'font-weight',
            'font-size',
            'line-height',
            'letter-spacing',
            'white-space',
            'word-break',
            'word-wrap',
            'text-align',
            'text-overflow',
          ],
        },
      ],
      { unspecified: 'bottom', emptyLineBeforeUnspecified: 'always' },
    ],
  },
};
```

## ..prettierrc.js

```js
// 2.2.1 기준
const defaultSettingsOfPrettier = {
  printWidth: 80, //  줄 바꿈 할 폭 길이
  tabWidth: 2, // 탭 너비
  useTabs: false, // 탭 사용 여부
  semi: true, // 세미콜론 사용 여부
  singleQuote: false, // single 쿼테이션 사용 여부
  quoteProps: 'as-needed', // 객체 속성에 쿼테이션 적용 방식
  jsxSingleQuote: false, // JSX에 single 쿼테이션 사용 여부
  trailingComma: 'all', // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
  bracketSameLine: false, // JSX의 마지막 `>`를 같은 줄에 둘 지 여부
  arrowParens: 'always', // 화살표 함수 괄호 사용 방식
  rangeStart: 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
  rangeEnd: Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
  parser: '', // 사용할 parser를 지정, 자동으로 지정됨
  filepath: '', // parser를 유추할 수 있는 파일을 지정
  requirePragma: false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  insertPragma: false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
  proseWrap: 'preserve', // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  htmlWhitespaceSensitivity: 'css', // HTML 공백 감도 설정
  vueIndentScriptAndStyle: false, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
  endOfLine: 'lf', // EoF 방식, OS별로 처리 방식이 다름
  embeddedLanguageFormatting: 'auto', // First available in v2.1.0
};

// for custom settings
module.exports = {
  ...defaultSettingsOfPrettier,
  printWidth: 120,
  bracketSameLine: false,
  singleQuote: true,
  parser: 'typescript',
};
```

## .lintstagedrc

```
{
  "*.{ts,tsx}": ["eslint", "stylelint \"**/*.tsx\""]
}
```

## .huskyrc

```
{
  "hooks": {
    "pre-commit": "lint-staged",
  }
}
```