import firebase from "../utils/firebase";
import { observable } from "mobx";
import { generateRepresentativeCombos } from "../utils/array-utils";
import { purposeVerbs } from "../data";
// import isWithinRange from "date-fns/is_within_range";
// import youthResponses from "./passion-to-purpose-v2-export.json";

const database = firebase.database();

class Store {
  /*prettier-ignore*/ @observable data = null;
  /*prettier-ignore*/ @observable hasLoaded = false;
  /*prettier-ignore*/ @observable permutations = null;

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

    const permutations = [];
    const seed = 2;
    Object.values(this.data).forEach(({ passions, purposes }, i) => {
      const purposesWithVerbs = purposes.map((purpose, i) => `${purposeVerbs[i]} ${purpose}`);
      permutations.push(...generateRepresentativeCombos(passions, purposesWithVerbs, 3, seed));
    });
    permutations.reverse();
    this.permutations = permutations;
  };
}

const store = new Store();

export default store;
