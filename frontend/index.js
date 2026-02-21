// Given a string, find the longest substring without repeating characters.

// Example:
// Input: "abcabcbb"
// Output: "abc" (length 3)

// Input: "bbbbb"
// Output: "b" (length 1)

// Input: "pwwkew"
// Output: "wke" (length 3)

let input = "abcabcbb";

const nonRepeatingChars = [];

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    if (input[i] == input[j]) {
    }
  }
}
