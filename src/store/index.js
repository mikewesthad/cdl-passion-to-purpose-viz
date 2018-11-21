import { observable, action, toJS } from "mobx";
import { generateRepresentativeCombos } from "../utils/array-utils";
import { purposeVerbs, passionPrompts, purposePrompts } from "../data";

const NUM_PASSIONS = passionPrompts.length;
const NUM_PURPOSES = purposePrompts.length;
const dev = process.env.NODE_ENV === "development";
const API_URL = dev ? "http://localhost:3001" : process.env.REACT_APP_BACKEND_URL;

class Store {
  @observable data = null;
  @observable roomNames = [];
  @observable rooms = [];
  @observable allResponses = null;
  @observable numResponses = 0;
  @observable allPurposes = [];
  @observable allPassions = [];
  @observable hasLoaded = false;
  @observable permutations = null;

  constructor() {
    fetch(`${API_URL}/rooms`)
      .catch(err => {
        alert("Error connecting to database!");
        console.log(err);
      })
      .then(res => res.json())
      .then(this.onData);
  }

  @action
  onData = json => {
    this.data = json || {}; // Empty db is null
    this.hasLoaded = true;
    this.roomNames = Object.keys(this.data);

    // Parse the rooms and responses into a flat array of [{ id, passions, ... }]
    const allResponses = [];
    const rooms = {};
    this.roomNames.forEach(roomName => {
      const room = this.data[roomName];
      let responseCount = 0;
      let firstResponseTime = Number.MAX_VALUE;
      let lastResponseTime = 0;

      Object.keys(room).forEach(versionNumber => {
        const version = room[versionNumber];

        Object.keys(version.responses).forEach(id => {
          version.responses[id].id = id;
          version.responses[id].roomName = roomName;
          version.responses[id].versionNumber = versionNumber;

          allResponses.push(version.responses[id]);

          responseCount += 1;
          lastResponseTime = Math.max(lastResponseTime, version.responses[id].timestamp);
          firstResponseTime = Math.min(firstResponseTime, version.responses[id].timestamp);
        });
      });
      rooms[roomName] = { responseCount, lastResponseTime, firstResponseTime };
    });
    allResponses.sort((a, b) => b.timestamp - a.timestamp); // Most recent first
    this.allResponses = allResponses;
    this.numResponses = allResponses.length;
    this.rooms = rooms;

    // Parse all the responses into arrays of: passions, purposes and passion + purpose
    const allPassions = [...Array(NUM_PASSIONS)].map(() => []);
    const allPurposes = [...Array(NUM_PURPOSES)].map(() => []);
    const permutations = [];
    const seed = 2;
    allResponses.forEach(({ passions, purposes }, i) => {
      const purposesWithVerbs = purposes.map((purpose, i) => `${purposeVerbs[i]} ${purpose}`);
      permutations.push(...generateRepresentativeCombos(passions, purposesWithVerbs, 3, seed));

      // Most recent responses first
      passions.forEach((p, i) => allPassions[i].unshift(p));
      purposes.forEach((p, i) => allPurposes[i].unshift(p));
    });
    this.permutations = permutations;
    this.allPassions = allPassions;
    this.allPurposes = allPurposes;
  };
}

const store = new Store();

export default store;

// import isWithinRange from "date-fns/is_within_range";
// import youthResponses from "./passion-to-purpose-v2-export.json";
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
