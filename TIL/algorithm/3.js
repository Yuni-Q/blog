function solution(grades) {
 const c = grades[0].slice(7, 9);
 const obj = {
  ['A+']: [],
  ['B+']: [],
  ['C+']: [],
  ['D+']: [],
  ['A0']: [],
  ['B0']: [],
  ['C0']: [],
  ['D0']: [],
  ['A-']: [],
  ['B-']: [],
  ['C-']: [],
  ['D-']: [],
  ['F']: [],
 };
 obj[c].push(grades[0]);
 const len = grades.length;
 for (let i = 1; i < len; i++) {
  const c = grades[i].split(' ');
  const a = c[0];
  const newArr = [
   ...obj['A+'],
   ...obj['A0'],
   ...obj['A-'],
   ...obj['B+'],
   ...obj['B0'],
   ...obj['B-'],
   ...obj['C+'],
   ...obj['C0'],
   ...obj['C-'],
   ...obj['D+'],
   ...obj['D0'],
   ...obj['D-'],
   ...obj['F'],
  ];
  for (let j = 0; j < newArr.length; j++) {
   const b = newArr[j].split(' ');
   if (a === b[0]) {
    const num = compare(grades[i], newArr[j]);
    if (num === 0 || num === 1) {
     break;
    }
    if (num === -1) {
     for (let k = 0; k < obj[b[1]].length; k++) {
      if (newArr[j] === obj[b[1]][k]) {
       obj[b[1]].splice(k, 1);
      }
     }
     obj[c[1]].push(grades[i]);
     break;
    }
   }
   if (j + 1 === newArr.length) {
    obj[c[1]].push(grades[i]);
   }
  }
 }

 return [
  ...obj['A+'],
  ...obj['A0'],
  ...obj['A-'],
  ...obj['B+'],
  ...obj['B0'],
  ...obj['B-'],
  ...obj['C+'],
  ...obj['C0'],
  ...obj['C-'],
  ...obj['D+'],
  ...obj['D0'],
  ...obj['D-'],
  ...obj['F'],
 ];

 function compare(a, b) {
  const c = a.slice(7, 8);
  const d = b.slice(7, 8);
  if (c === d) {
   if (a.length === 8) {
    return 0;
   }
   const e = a.slice(8, 9);
   const f = b.slice(8, 9);
   if (e === f) {
    return 0;
   }
   if (e === '+' && f === '-') {
    return -1;
   }
   if (e === '+' && f === '0') {
    return -1;
   }
   if (e === '0' && f === '-') {
    return -1;
   }
   return +1;
  }
  if (c < d) {
   return -1;
  }
  if (c > d) {
   return 1;
  }
 }
}

console.log(
 solution(['DM0106 D-', 'PL6677 B+', 'DM0106 B+', 'DM0106 B+', 'PL6677 C0', 'GP0000 A0', 'GP0000 A-', 'GP0000 A+']),
);
