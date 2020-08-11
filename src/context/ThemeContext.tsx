import React, { useReducer, useContext, createContext, Dispatch } from 'react';
import { THEME, SNOW } from '../constants';
import * as Dom from '../utils/dom';

function canUseDOM() {
	return !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);
}

function toggleTheme(theme) {
	switch (theme) {
		case THEME.LIGHT: {
			Dom.addClassToBody(THEME.LIGHT);
			Dom.removeClassToBody(THEME.DARK);
			break;
		}
		case THEME.DARK: {
			Dom.addClassToBody(THEME.DARK);
			Dom.removeClassToBody(THEME.LIGHT);
			break;
		}
	}
}

// 필요한 타입들을 미리 선언
type Theme = string;
type Snow = string;

// 상태를 위한 타입
type State = {
	theme: Theme;
	snow: Snow;
};

// 모든 액션들을 위한 타입
type Action =
	| { type: 'SET_THEME'; theme: Theme }
	| { type: 'SET_SNOW'; snow: Snow };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type ThemeDispatch = Dispatch<Action>;

// Context 만들기
const ThemeStateContext = createContext<State | null>(null);
const ThemeDispatchContext = createContext<ThemeDispatch | null>(null);

// 리듀서
function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_THEME':
			localStorage.setItem('theme', action.theme);
			document.documentElement.setAttribute('data-theme', action.theme);
			toggleTheme(action.theme);
			return {
				...state,
				theme: action.theme,
			};
		case 'SET_SNOW':
			localStorage.setItem('snow', action.snow);
			return {
				...state,
				snow: action.snow,
			};
		default:
			throw new Error('Unhandled action');
	}
}

// ThemeProvider 에서 useReduer를 사용하고
// ThemeStateContext.Provider 와 ThemeDispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	let localStorageTheme = THEME.LIGHT;
	let localStorageSnow = SNOW.ON;
	if (!!canUseDOM()) {
		localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme === THEME.DARK) {
			document.documentElement.setAttribute('data-theme', THEME.DARK);
			localStorage.setItem('theme', THEME.DARK);
			localStorageTheme = THEME.DARK;
		}
		localStorageSnow = localStorage.getItem('snow');
		if (localStorageSnow === SNOW.OFF) {
			localStorage.setItem('snow', SNOW.OFF);
			localStorageSnow = SNOW.OFF;
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		theme: localStorageTheme as Theme,
		snow: localStorageSnow as Theme,
	});

	return (
		<ThemeStateContext.Provider value={state}>
			<ThemeDispatchContext.Provider value={dispatch}>
				{children}
			</ThemeDispatchContext.Provider>
		</ThemeStateContext.Provider>
	);
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useThemeState() {
	const state = useContext(ThemeStateContext);
	if (!state) throw new Error('Cannot find ThemeProvider'); // 유효하지 않을땐 에러를 발생
	return state;
}

export function useThemeDispatch() {
	const dispatch = useContext(ThemeDispatchContext);
	if (!dispatch) throw new Error('Cannot find ThemeProvider'); // 유효하지 않을땐 에러를 발생
	return dispatch;
}
