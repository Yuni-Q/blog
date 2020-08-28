import React, { useCallback, useEffect, useRef, useState } from 'react';
import './index.css';
const Memo = ({
	id,
	top,
	left,
	width,
	height,
	text,
	onClickDelete,
	onClickMove,
	onClickResize,
	onChangeText,
}) => {
	const x = useRef(null);
	const y = useRef(null);
	const headerRef = useRef(null);
	const blindRef = useRef(null);
	const isHeaderRef = useRef(null);
	const isBlindRef = useRef(null);
	const memoRef = useRef(null);
	const textareaRef = useRef(null);

	const downMouseHeader = useCallback(
		event => {
			if (event.target.dataset.delete) {
				onClickDelete(event);
				return;
			}
			if (event.target.dataset.header) {
				x.current = event.clientX - left;
				y.current = event.clientY - top;
				isHeaderRef.current = true;
				return;
			}
		},
		[onClickDelete, left, top]
	);

	const onClickBlind = event => {
		if (event.target.dataset.blind) {
			isBlindRef.current = true;
		}
	};

	const moveMouse = useCallback(
		event => {
			const momeStyle = memoRef.current.style;
			if (isHeaderRef.current) {
				const momeStyle = memoRef.current.style;
				momeStyle.top = `${event.clientY - y.current}px`;
				momeStyle.left = `${event.clientX - x.current}px`;
				momeStyle.zIndex = '1';
			}
			if (isBlindRef.current) {
				const textareaStyle = textareaRef.current.style;
				textareaStyle.height = `${event.clientY - top - 30}px`;
				textareaStyle.width = `${event.clientX - left - 15}px`;
				momeStyle.zIndex = '1';
			}
		},
		[top, left]
	);

	const upMouseHeader = useCallback(() => {
		onClickMove(id, memoRef.current.style.top, memoRef.current.style.left);
		isHeaderRef.current = false;
	}, [id, onClickMove]);

	const upMouseBlind = useCallback(() => {
		isBlindRef.current = false;
		onClickResize(
			id,
			textareaRef.current.style.width,
			textareaRef.current.style.height
		);
	}, [id, onClickResize]);

	useEffect(() => {
		const header = headerRef.current;
		const blind = blindRef.current;
		header.addEventListener('mousedown', downMouseHeader, true);
		window.addEventListener('mousemove', moveMouse, true);
		header.addEventListener('mouseup', upMouseHeader, true);
		blind.addEventListener('mousedown', onClickBlind, true);
		blind.addEventListener('mouseup', upMouseBlind, true);

		return () => {
			header.removeEventListener('mousedown', downMouseHeader, true);
			window.removeEventListener('mousemove', moveMouse, true);
			header.removeEventListener('mouseup', upMouseHeader, true);
			blind.removeEventListener('mousedown', onClickBlind, true);
			blind.removeEventListener('mouseup', upMouseBlind, true);
		};
	}, [
		downMouseHeader,
		id,
		moveMouse,
		onChangeText,
		upMouseBlind,
		upMouseHeader,
		text,
	]);
	return (
		<div
			className="memo"
			ref={memoRef}
			style={{ top: `${top}px`, left: `${left}px` }}
		>
			<div
				className="header"
				data-header={true}
				data-id={id}
				ref={headerRef}
				onClick={downMouseHeader}
			>
				<h1 className="blind">메모장</h1>
				<button
					className="btn_close"
					data-delete={true}
					data-id={id}
					onClick={onClickDelete}
				>
					<span className="blind">닫기</span>
				</button>
			</div>
			<div className="content">
				<textarea
					className="textarea"
					ref={textareaRef}
					style={{ width: `${width}px`, height: `${height}px` }}
					placeholder="메모 하십시오!"
					value={text}
					onChange={e => {
						onChangeText(id, e.target.value, e.target);
					}}
				/>
				<button className="btn_size" data-blind={true} ref={blindRef}>
					<span className="blind">메모장 크기 조절</span>
				</button>
			</div>
		</div>
	);
};

export default Memo;
