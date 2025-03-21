---
title: react forceupdate
date: 2020-08-19 17:08:57
category: frontend
tags: []
draft: true
---

```tsx
export default class App extends BaseComponent<
	{},
	{
		a: {
			b: number;
		};
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			a: {
				b: 1,
			},
		};
	}

	onChangeA = (value: number) => {
		this.setState({
			a: {
				b: value,
			},
		});
	};

	render() {
		return (
			<>
				<Box2 a={this.state.a} onChangeA={this.onChangeA} />
				<Box3 a={this.state.a} onChangeA={this.onChangeA} />
			</>
		);
	}
}

class Box2 extends BaseComponent<any> {
	render() {
		return (
			<input
				type="number"
				value={this.props.a.b}
				onChange={e => {
					this.props.a.b = e.target.value;
					this.forceUpdate();
					//this.props.onChangeA(e.target.value);
				}}
			/>
		);
	}
}
class Box3 extends BaseComponent<any> {
	render() {
		return <Box4 a={this.props.a} onChangeA={this.props.onChangeA} />;
	}
}

class Box4 extends BaseComponent<any> {
	render() {
		return (
			<input
				type="number"
				value={this.props.a.b}
				onChange={e => {
					this.props.a.b = e.target.value;
					this.forceUpdate();
					//this.props.onChangeA(e.target.value);
				}}
			/>
		);
	}
}
```

- this.props.onChangeA(e.target.value);를 사용 할 경우 Box2와 Box4는 동시에 업데이트 됩니다.
- 하지만 this.props.a.b = e.target.value; this.forceUpdate();를 사용할 경우 해당 컴포넌트만 업데이트 됩니다.
- this.forceUpdate()가 모든 컴포넌트를 업데이트 하는 줄 알았는데 해당 컴포넌트와 자식 컴포넌트만을 업데이트 한다는 것을 알게 되었습니다.
