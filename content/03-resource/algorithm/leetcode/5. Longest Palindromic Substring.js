// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

// Example 1:

// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
// Example 2:

// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let length = s.length;

  // 길이가 0 일 때
  if (0 === length) return '';
  // 길이가 1이거나 같은 문자만 있을 때
  if (1 === length || new Set(s.split('')).size === length) return s.charAt(0);
  // 전체가 회문일 때
  if (s === s.split('').reverse().join('')) return s;

  // 캐시 리스트
  let cache = [''];

  // 길이 순회
  for (length = s.length; length > 1; length--) {
    // 뒤에서 첫번째 문자
    let char1 = s.charAt(length - 1);
    // 뒤에서 두번째 문자
    let char2 = s.charAt(length - 2);
    // 문자 뒤집기
    const longTerminalRepeat = char1 + char2;
    // 문자 위치 찾기
    let position = s.indexOf(longTerminalRepeat);

    // position이 존재한다면 반복 실행
    while (~position) {
      // 사이 문자 찾아내기
      let subStr = s.slice(position + 1, -1);
      switch (subStr.length) {
        // 같은 문자
        case 0:
          cache.push(char1 + char1);
          break;
        //  2번째 문자가 한번만 나오는 경우
        case 1:
          cache.push(char1 + subStr + char1);
          break;
        // 문자가 두번씩 나오는 경우
        case 2:
          cache.push(char1 + char2 + char2 + char1);
          break;
      }
      // 그외 경우들
      if (subStr === subStr.split('').reverse().join('')) {
        cache.push(char1 + subStr + char1);
        break;
      }
      // 그 다음 포지션에서 행위 반복
      position = s.indexOf(longTerminalRepeat, position + 1);
    }
    // 맨끝 문자 지우기
    s = s.slice(0, -1);
  }
  // 제일 긴거 찾기 || 없으면 첫번째 문자
  return (
    cache.reduce((max, item) => (item.length > max.length ? item : max), '') ||
    s.charAt(0)
  );
};

var longestPalindrome2 = function (s) {
  if (s.length === 1) {
    return s;
  }
  let max = s[0] === s[1] ? `${s[0]}${s[1]}` : s[0];
  let start;
  let end;
  for (let i = 0; i < s.length; i++) {
    start = i;
    end = i;
    if (s[start] === s[end + 1]) {
      end++;
      do {
        end++;
      } while (s[start] === s[end]);
      if (end - start > max.length) {
        max = s.substring(start, end);
      }
      if (end === s.length) {
        break;
      }
      i = end - 1;
      start--;
    }
    while (start >= 0 && end < s.length) {
      if (s[start] !== s[end]) {
        break;
      }
      start--;
      end++;
    }
    if (end - start > max.length) {
      max = s.substring(start + 1, end);
    }
  }
  return max;
};
