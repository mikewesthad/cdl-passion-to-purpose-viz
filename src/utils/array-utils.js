import seedrandom from "seedrandom";
const defaultSeed = undefined;

/**
 * Classic Fisher-Yates algorithm - shuffles in place.
 *
 * @export
 * @param {array} array Array to shuffle in place
 * @returns {array} The shuffled array
 */
export function shuffle(array, seed = defaultSeed) {
  const rng = seedrandom(seed);

  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(rng() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

/**
 * Pick a random value from the given array, using the given seed.
 * @export
 */
export function pick(array, seed = defaultSeed) {
  const rng = seedrandom(seed);
  return array[Math.floor(rng() * array.length)];
}

/**
 * Generate all possible combinations of values from array1 with values from array2, e.g.
 *    ["cat", "dog", "goat"] and ["red", "blue"]
 * would return
 *    [["cat", "red"], ["cat", "blue"], ["dog", "red"], ...]
 *
 * @export
 * @param {*} array1
 * @param {*} array2
 * @returns {array} Array of combinations where each element is of the form: [array1 value, array2
 * value]
 */
export function generateAllCombinations(array1, array2) {
  const combinations = [];
  array1.forEach(v1 => {
    array2.forEach(v2 => {
      combinations.push([v1, v2]);
    });
  });
  shuffle(combinations);
  return combinations;
}

/**
 * Generate a representative sample of combinations of values from array1 with values from array2
 * where no values from either array are reused, e.g.
 *    ["cat", "dog"] and ["red", "blue"]
 * could return
 *    [["cat", "red"], ["dog", "blue"]]
 * or
 *    [["cat", "blue"], ["dog", "red"]]
 *
 * @export
 */
export function generateRepresentativeCombos(array1, array2, numCombinations, seed = defaultSeed) {
  const rng = seedrandom(seed);
  let a1 = array1.slice();
  let a2 = array2.slice();
  const combinations = [];
  for (let i = 0; i < numCombinations; i++) {
    if (a1.length === 0 || a2.length === 0) break;
    const i1 = Math.floor(rng() * a1.length);
    const i2 = Math.floor(rng() * a2.length);
    combinations.push([a1[i1], a2[i2]]);
    a1.splice(i1, 1);
    a2.splice(i2, 1);
  }
  return combinations;
}

export function alphabeticalSort(array) {
  return array.sort(alphabeticalSortComparison);
}

export function alphabeticalSortComparison(a, b) {
  if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
}
