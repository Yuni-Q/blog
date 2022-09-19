// Given a 32-bit signed integer, reverse digits of an integer.

// Example 1:

// Input: 123
// Output: 321
// Example 2:

// Input: -123
// Output: -321
// Example 3:

// Input: 120
// Output: 21
// Note:
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

/**
 * @param {number} x
 * @return {number}
 **/
var reverse = function (x) {
 let str = String(Math.abs(x));
 let result = '';

 for (let i = str.length - 1; i >= 0; i--) {
  result += str[i];
 }

 if (x < 0) {
  result = '-' + result;
 }

 if (result > 2 ** 31 - 1 || result < (-2) ** 31) {
  return 0;
 }
 return result;
};

var reverse2 = function (x) {
 if (x === 0) return 0;
 let a = 1;
 if (x < 0) {
  a = -1;
  x = x * -1;
 }
 let c = JSON.stringify(x);
 // console.log('c1',c)
 let b = c.split('').reverse().join('');
 while (true) {
  if (b[0] == '0') {
   b = b.slice(1, b.length);
  } else {
   break;
  }
 }
 console.log(b);
 c = JSON.parse(b);
 // console.log('c2',c)
 c = a * c;

 if (c > 2 ** 31 - 1) {
  return 0;
 } else if (c < -(2 ** 31)) {
  return 0;
 } else {
  return c;
 }
};

function reverse3(n) {
 // Array#reverse method takes no argument.
 // You can use `Math.abs()` instead of changing the sign if negative.
 // Conversion of string to number can be done with unary plus operator.
 var reverseN = +String(Math.abs(n)).split('').reverse().join('');
 // Use a number constant instead of calculating the power
 if (reverseN > 0x7fffffff) {
  return 0;
 }
 // As we did not change the sign, you can do without the boolean isNegative.
 // Don't multiply with -1, just use the unary minus operator.
 // The ternary operator might interest you as well (you could even use it
 //    to combine the above return into one return statement)
 return n < 0 ? -reverseN : reverseN;
}
