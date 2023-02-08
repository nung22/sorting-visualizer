/**
 * Sorts the given nums in-place by mutating the array.
 * Best: O(n^2) linear when array is already sorted.
 * Average: O(n^2) quadratic.
 * Worst: O(n^2) quadratic when the array is reverse sorted.
 * @param {Array<number>} nums
 * @returns {Array<number>} The given nums after being sorted.
 */
const swap = (arr, left, right) => {
  let temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
} 

const BubbleSort = nums => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
      }
    }
  }
  return nums;
}

export default BubbleSort;