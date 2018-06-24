/**
 * Classic Fisher-Yates algorithm - shuffles in place.
 *
 * @export
 * @param {array} array Array to shuffle in place
 * @returns {array} The shuffled array
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

/**
 * Generate all possible combinations of values from array1 with values from array2, e.g.
 *    ["cat", "dog", "goat"] and ["red", "blue", "violet"]
 * would return
 *    [["dog", "violet"], ["cat", "red"], ["dog", "blue"], ...]
 *
 * @export
 * @param {*} array1
 * @param {*} array2
 * @returns {array} Array of combinations where each element is of the form: [array1 value, array2
 * value]
 */
export function generateCombinations(array1, array2) {
  const combinations = [];
  array1.forEach(v1 => {
    array2.forEach(v2 => {
      combinations.push([v1, v2]);
    });
  });
  shuffle(combinations);
  return combinations;
}
