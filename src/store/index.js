import firebase from "../utils/firebase";
import { observable, computed, toJS } from "mobx";
import { generateRepresentativeCombos } from "../utils/array-utils";
import { purposeVerbs, passionPrompts, purposePrompts } from "../data";
// import isWithinRange from "date-fns/is_within_range";
// import youthResponses from "./passion-to-purpose-v2-export.json";

const database = firebase.database();

const NUM_PASSIONS = passionPrompts.length;
const NUM_PURPOSES = purposePrompts.length;

class Store {
  @observable data = null;
  @observable numResponses = 0;
  @observable allPurposes = [];
  @observable allPassions = [];
  @observable hasLoaded = false;
  @observable permutations = null;

  constructor() {
    database.ref().on("value", this.onFirebaseValue);
  }

  onFirebaseValue = snapshot => {
    this.data = snapshot.val() || {}; // Empty db is null

    // Inject the local copy of youth responses into the viz
    // Object.assign(this.data, youthResponses);

    // Filter only specific data
    // const val = snapshot.val();
    // const filteredData = {};
    // const startDate = new Date("August 22, 2018 00:00:00");
    // const endDate = new Date("August 22, 2018 17:00:00");
    // Object.entries(val).forEach(([key, value]) => {
    //   const { timestamp } = value;
    //   if (isWithinRange(timestamp, startDate, endDate)) filteredData[key] = value;
    // });
    // this.data = filteredData;

    this.hasLoaded = true;

    const values = Object.values(this.data);
    const allPassions = [...Array(NUM_PASSIONS)].map(() => []);
    const allPurposes = [...Array(NUM_PURPOSES)].map(() => []);
    const permutations = [];
    const seed = 2;
    values.forEach(({ passions, purposes }, i) => {
      const purposesWithVerbs = purposes.map((purpose, i) => `${purposeVerbs[i]} ${purpose}`);
      permutations.push(...generateRepresentativeCombos(passions, purposesWithVerbs, 3, seed));

      // Most recent responses first
      passions.forEach((p, i) => allPassions[i].unshift(p));
      purposes.forEach((p, i) => allPurposes[i].unshift(p));
    });
    permutations.reverse();
    this.permutations = permutations;

    this.allPassions = allPassions;
    this.allPurposes = allPurposes;

    this.numResponses = values.length;
  };
}

const store = new Store();

export default store;
