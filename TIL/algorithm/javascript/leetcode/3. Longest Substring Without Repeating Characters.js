// Given a string, find the length of the longest substring without repeating characters.

// Example 1:

// Input: "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
//              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
 if (!s) return 0;
 if (s.length === 1) return 1;
 let result = 1;
 for (let i = 0; i < s.length; i++) {
  let sum = 1;
  const arr = [s[i]];
  for (let j = i + 1; j < s.length; j++) {
   if (arr.includes(s[j])) {
    break;
   }
   arr.push(s[j]);
   sum += 1;
  }
  result = Math.max(sum, result);
 }
 return result;
};

var lengthOfLongestSubstring2 = function (s) {
 if (!s) return 0;
 if (s.length < 2) return s.length;
 var ls = s[0]; // 가장 긴 부분 문자열
 var cs = s[0]; // 현재 문자열
 for (var i = 1; i < s.length; i++) {
  var index = cs.indexOf(s[i]); // 현재 문자열에서 현재 문자의 인덱스 가져오기

  // 현재 문자열에서 문자가 존재하는 경우
  if (index > -1) {
   if (cs.length > ls.length) {
    ls = cs; // 현재 문자열이 더 긴 경우 가장 긴 부분 문자열 업데이트
   }
   cs = cs.substring(index + 1, cs.length) + s[i]; // 반복되는 문자 뒤부터 다 가져오고 반복 문자 추가
  } else {
   cs = cs + s[i]; // 문자 추가
  }
 }
 if (cs.length > ls.length) {
  ls = cs; // 현재 문자열이 더 긴 경우 가장 긴 부분 문자열 업데이트
 }
 return ls.length;
};

var lengthOfLongestSubstring3 = function (s) {
 if (s.length <= 1) {
  return s.length;
 }

 let maxStr = '';
 s.split('').reduce((prev, curr) => {
  let nextStr;

  if (prev.indexOf(curr) === -1) {
   nextStr = prev + curr;
  } else {
   const newFirstInd = prev.indexOf(curr) + 1;
   const newStr = prev.substring(newFirstInd, prev.length);
   nextStr = newStr + curr;
  }

  if (nextStr.length > maxStr.length) {
   maxStr = nextStr;
  }

  return nextStr;
 });

 return maxStr.length;
};
