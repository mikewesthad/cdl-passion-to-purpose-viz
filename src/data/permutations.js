import data from "./firebase-exports";
import purposeVerbs from "./purpose-verbs";
import { generateCombinations, shuffle } from "../utils/array-utils";

const permutations = [];
Object.values(data).forEach(({ passions, purposes }, i) => {
  const purposesWithVerbs = purposes.map(
    (purpose, i) => `${purposeVerbs[i]} ${purpose}`
  );
  permutations.push(...generateCombinations(passions, purposesWithVerbs));
});
shuffle(permutations);

export default permutations;
