// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2, carry) {
 // 재귀 종료 조건 (ListNode가 모두 끝나는 시점)
 if (!l1 && !l2 && !carry) {
  return null;
 }

 // 올림 수
 carry = carry || 0;

 // 값 더하기
 let valRes = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;

 carry = 0;

 // 한 자리 수로 만들기
 if (valRes >= 10) {
  // ~~ === floor 연산자와 동일
  carry = ~~(valRes / 10);
  valRes = valRes % 10;
 }

 // 새 노드 만들기
 let l3 = new ListNode(valRes);

 // 재귀 실행
 l3.next = addTwoNumbers(l1 ? l1.next : null, l2 ? l2.next : null, carry);

 return l3;
}
