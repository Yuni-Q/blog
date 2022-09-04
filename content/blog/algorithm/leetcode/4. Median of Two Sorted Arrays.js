// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

// You may assume nums1 and nums2 cannot be both empty.

// Example 1:

// nums1 = [1, 3]
// nums2 = [2]

// The median is 2.0
// Example 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// The median is (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const arr = nums1.concat(nums2);
  arr.sort((a, b) => a - b);
  const len = arr.length;
  if (arr.length % 2 === 0) {
    return (arr[len / 2 - 1] + arr[len / 2]) / 2;
  }
  const l = Math.floor(len / 2);
  return arr[l];
};

var findMedianSortedArrays2 = function (nums1, nums2) {
  // Custom sort as sort implementation is different across browsers
  let bigArr = [...nums1, ...nums2].sort((a, b) => a - b);
  let len = bigArr.length;

  if (!len) return 0;

  let idx = Math.floor((len - 1) / 2);
  let ret = bigArr[idx];

  if (len % 2 === 0) {
    ret = (ret + bigArr[idx + 1]) / 2;
  }

  return ret;
};

var findMedianSortedArrays3 = function (nums1, nums2) {
  const mergedArr = [...nums1, ...nums2].sort(function (a, b) {
    return a - b;
  });
  const lengthMerged = mergedArr.length;
  if (lengthMerged % 2 !== 0) {
    return mergedArr[lengthMerged / 2 - 0.5];
  }
  return (mergedArr[lengthMerged / 2] + mergedArr[lengthMerged / 2 - 1]) / 2;
};
