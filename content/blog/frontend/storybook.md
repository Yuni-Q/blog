---
title: storybook
date: 2020-08-20 13:08:51
category: frontend
tags: ['storybook']
draft: true
---

- 프로젝트를 시작할 당시 6버전이 정식 릴리즈 되지 않아서 5.3.19 버전으로 시작했습니다.

## package.json

```json
{
	"scripts": {
		"storybook": "start-storybook -p 9009 -s public",
		"build-storybook": "build-storybook -s public"
	},
	"devDependencies": {
		"@babel/plugin-syntax-jsx": "^7.10.4",
		"@storybook/addon-actions": "^5.3.19",
		"@storybook/addon-docs": "^5.3.19",
		"@storybook/addon-info": "^5.3.19",
		"@storybook/addon-knobs": "^5.3.19",
		"@storybook/addon-links": "^5.3.19",
		"@storybook/addon-viewport": "^6.0.0",
		"@storybook/addons": "^5.3.19",
		"@storybook/preset-create-react-app": "^3.0.0",
		"@storybook/react": "^5.3.19",
		"@storybook/theming": "^6.0.12"
	}
}
```

## main.js

```javascript
module.exports = {
	stories: ['../src/**/*.stories.(tsx|mdx)'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-knobs/register',
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-viewport',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
	],

	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [['react-app', { flow: false, typescript: true }]],
					},
				},
			],
		});
		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	},
};
```

- 5버전까지는 typescript를 사용하기 위해 추가적인 설정이 필요합니다.
- 주로 mdx를 사용하여 작업하였습니다.
- 여러가지 addons을 사용합니다.
- docs를 중점으로 작업합니다.

## preview.jsx

```jsx
import React from 'react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { addParameters } from '@storybook/client-api';
import { DocsContainer } from '@storybook/addon-docs/blocks';

import RootComponent from '../src/components/Base/RootComponent';
import DialogStore from '../src/components/Dialog/DialogStore';
import ToastStore from '../src/components/Toast/ToastStore';
import '../src/scss/storybook.scss';

const headers = ['Guide', 'Form', 'Content'];

const storySort = (a, b) => {
	const aHeader = a[1].kind.substr(0, a[1].kind.indexOf('|'));
	const bHeader = b[1].kind.substr(0, b[1].kind.indexOf('|'));

	if (aHeader !== bHeader) {
		const aHeaderIndex = headers.findIndex(h => h === aHeader);
		const bHeaderIndex = headers.findIndex(h => h === bHeader);
		return aHeaderIndex - bHeaderIndex;
	}

	return 0;
};

addParameters({
	docs: {
		container: ({ children, context }) => (
			<DocsContainer context={context}>
				<div>{children}</div>
			</DocsContainer>
		),
	},
	options: {
		storySort,
	},
});

addDecorator(withKnobs);
addDecorator(storyFn => {
	const root = document.getElementById('root');
	return root.hidden ? storyFn() : <div>{storyFn()}</div>;
});
```

## storise.mdx

```jsx
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';
import { action } from '@storybook/addon-actions';
import { text, select, boolean, array, object } from '@storybook/addon-knobs';

import { Button } from './Button';

<Meta title="Content|Button" />

<h2>Button</h2>
<span>
  button element를 wrapping한 component입니다. <br/>
  onClick 이벤트를 제공합니다.
</span>

<h2>기본 컴포넌트</h2>
<Preview>
<Story name="기본 컴포넌트">
    {() => {
      const a = 1;
      console.log(a);
      return (
        <Button
          size={select('size', {
              large: 'large',
              popup: 'popup',
              medium: 'medium',
              small: 'small',
              text: 'text',
          }, 'medium')}
          buttonStyle={select('buttonStyle', {
              primary: 'primary',
              secondary: 'secondary',
              danger: 'danger',
              text: 'text',
              muted: 'muted'
          }, 'primary')}
          disabled={boolean('disabled', false)}
          isLoading={boolean('isLoading', false)}
          onClick={action('clicked')}
        >
          {text('children', '적용')}
        </Button>
      )
    }}
</Story>
</Preview>

<h2>프로퍼티</h2>
<Props of={Button}/>
```

- Preview 안에서 줄 공백이 생기면 에러가 발생합니다.

## manager.js

```javascript
import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
	theme: theme,
});
```

## theme.js

```javascript
import { create } from '@storybook/theming/create';

export default create({
	base: 'light',

	colorPrimary: '#1A7CFF',
	colorSecondary: '#1a7cff',

	// UI
	appBg: '#f1f1f1',
	appContentBg: 'white',
	appBorderRadius: 0,

	// Typography
	fontBase: '"Open Sans", sans-serif',
	fontCode: 'monospace',

	// Text colors
	textColor: '#212329',
	textInverseColor: '#666A75',

	// Toolbar default and active colors
	barTextColor: 'black',
	barSelectedColor: '#1a7cff',
	barBg: 'white',

	// Form colors
	inputBorder: '#BBC0CD',
	inputTextColor: '#212329',
	inputBorderRadius: 4,

	brandTitle: 'yuni-q',
	brandImage: 'https://yuni-q.github.io/favicon.png',
});
```
