import React from "react";
import permutations from "../data/permutations";

export default function List() {
  return (
    <div className="container">
      <ul className="grid">
        {permutations.map(([passion, purpose], i) => (
          <li className="col prompt" key={i}>
            How might we use{" "}
            <span className="passion">{passion.toLowerCase().trim()}</span> to{" "}
            <span className="purpose">{purpose.toLowerCase().trim()}</span>?
          </li>
        ))}
      </ul>
    </div>
  );
}
