import React from "react";
import permutations from "../data/permutations";

export default class Generator extends React.Component {
  state = {
    permutationIndex: 0
  };

  nextPermutation = () => {
    this.setState(prev => {
      let permutationIndex = prev.permutationIndex + 1;
      if (permutationIndex >= permutations.length) permutationIndex = 0;
      return { permutationIndex };
    });
  };

  render() {
    const { permutationIndex } = this.state;
    const [passion, purpose] = permutations[permutationIndex];

    return (
      <div className="container container--small">
        <li className="col prompt prompt--big">
          How might we use{" "}
          <span className="passion">{passion.toLowerCase().trim()}</span> to{" "}
          <span className="purpose">{purpose.toLowerCase().trim()}</span>?
        </li>
        <div className="text-center">
          <button className="button" onClick={this.nextPermutation}>
            Generate Another
          </button>
        </div>
      </div>
    );
  }
}
