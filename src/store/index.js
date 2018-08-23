import firebase from "../utils/firebase";
import { observable } from "mobx";
import { generateRepresentativeCombos } from "../utils/array-utils";
import { purposeVerbs } from "../data";

const database = firebase.database();

class Store {
  @observable data = null;
  @observable hasLoaded = false;
  @observable permutations = null;

  constructor() {
    database.ref().on("value", this.onFirebaseValue);
  }

  onFirebaseValue = snapshot => {
    this.data = snapshot.val() || {}; // Empty db is null
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
