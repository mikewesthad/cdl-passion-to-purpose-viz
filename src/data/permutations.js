import data from "./passion-to-purpose-export.json";
import { generateCombinations, shuffle } from "../utils/array-utils";

const purposeVerbs = [
  "challenge",
  "protest",
  "improve",
  "advocate for",
  "change"
];
const permutations = [];

Object.values(data).forEach(({ passions, purposes }, i) => {
  const purposesWithVerbs = purposes.map(
    (purpose, i) => `${purposeVerbs[i]} ${purpose}`
  );
  permutations.push(...generateCombinations(passions, purposesWithVerbs));
});
shuffle(permutations);

export default permutations;
