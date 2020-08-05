import React, { useRef, useEffect } from 'react';

export const ChristmasTheme = ({ checked, children }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!checked) {
			return;
		}
		const COUNT = 700;
		const canvasNode = canvasRef.current;
		const ctx = canvasNode.getContext('2d');
		let timeId;

		const snow = () => {
			cancelAnimationFrame(timeId);
			let i = 0;
			let snowflakes = [];
			let snowflake;
			const width = document.documentElement.offsetWidth;
			const height = document.documentElement.offsetHeight;
			canvasNode.width = width;
			canvasNode.height = height;

			const reset = () => {
				return {
					x: Math.random() * width,
					y: Math.random() * -height,
					vy: 1 + Math.random() * 3,
					vx: 0.5 - Math.random(),
					r: 1 + Math.random() * 6,
					opacity: 0.5 + Math.random() * 0.5,
				};
			};

			const init = () => {
				ctx.fillStyle = '#FFCAEF';

				for (i = 0; i < COUNT; i++) {
					snowflake = reset();
					snowflakes.push(snowflake);
				}
				requestAnimationFrame(update);
			};

			for (i = 0; i < COUNT; i++) {
				snowflake = reset();
				snowflakes.push(snowflake);
			}

			const update = () => {
				ctx.clearRect(0, 0, width, height);

				for (i = 0; i < COUNT; i++) {
					snowflake = snowflakes[i];
					snowflake.y += snowflake.vy;
					snowflake.x += snowflake.vx;

					// 벚꽃을 내리고 싶었던 싶었던 yuni-q의 꿈
					// const kappa = 0.5522848;
					// const x = snowflake.x;
					// const y = snowflake.y;
					// const w = 10;
					// const h = 20;
					// const ox = (w / 2) * kappa; // control point offset horizontal
					// const oy = (h / 2) * kappa; // control point offset vertical
					// const xe = x + w; // x-end
					// const ye = y + h; // y-end
					// const xm = x + w / 2; // x-middle
					// const ym = y + h / 2; // y-middle
					// ctx.globalAlpha = snowflake.opacity;
					// ctx.beginPath();
					// ctx.moveTo(x, ym);
					// ctx.rotate(1);
					// ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
					// ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
					// ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
					// ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
					// ctx.closePath();
					// ctx.fill();
					// ctx.stroke();

					ctx.globalAlpha = snowflake.opacity;
					ctx.beginPath();
					ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();

					if (snowflake.y > height) {
						snowflakes[i] = reset();
					}
				}
				timeId = requestAnimationFrame(update);
			};
			init();
		};
		snow();
		(function() {
			const throttle = function(type, name, obj) {
				obj = obj || window;
				let running = false;
				const func = function() {
					if (running) {
						return;
					}
					running = true;
					requestAnimationFrame(function() {
						obj.dispatchEvent(new CustomEvent(name));
						running = false;
					});
				};
				obj.addEventListener(type, func);
			};

			/* init - you can init any event */
			throttle('resize', 'optimizedResize', null);
		})();
		window.addEventListener('optimizedResize', snow);
		return () => {
			window.removeEventListener('optimizedResize', snow);
		};
	}, [canvasRef, checked]);

	return (
		<>
			{!!checked && <canvas className="snowflakes" ref={canvasRef} />}
			{children}
		</>
	);
};
