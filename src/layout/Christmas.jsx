import React, { useRef, useEffect } from 'react';

export const ChristmasTheme = ({ children }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
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
					r: 1 + Math.random() * 2,
					opacity: 0.5 + Math.random() * 0.5,
				};
			};

			const init = () => {
				ctx.fillStyle = '#FFF';

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

					ctx.globalAlpha = snowflake.opacity;
					ctx.beginPath();
					ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
					ctx.closePath();
					ctx.fill();

					if (snowflake.y > height) {
						snowflake = reset();
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
			throttle('resize', 'optimizedResize');
		})();
		window.addEventListener('optimizedResize', snow);
		return () => {
			window.removeEventListener('optimizedResize', snow);
		};
	}, [canvasRef]);

	return (
		<>
			<canvas className="snowflakes" ref={canvasRef} />
			{children}
		</>
	);
};
