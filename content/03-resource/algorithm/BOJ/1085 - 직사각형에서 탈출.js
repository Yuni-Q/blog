const input = ['6 2 10 3'];

const [x, y, w, h] = input[0].split(' ').map((n) => Number(n));

console.log(Math.min(w - x, h - y, x, y));
