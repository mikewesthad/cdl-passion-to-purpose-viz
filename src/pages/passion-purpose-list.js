import React, { Component } from "react";
import { observer } from "mobx-react";

import { passionPrompts, purposePrompts } from "../data/prompts";

@observer
export default class PassionPurposeList extends Component {
  render() {
    const { store } = this.props;
    if (store.data === null) return <div className="container">Loading...</div>;

    const entries = Object.entries(store.data);
    entries.reverse(); // Sort from most recent to least recent

    const contents = entries.map(([key, value], i) => {
      const { passions, purposes } = value;
      return (
        <div key={key}>
          {key === "-LH9CPd8xpsLWAQRExao" && (
            <div
              style={{
                fontWeight: "bold",
                borderBottom: "1px solid black",
                paddingBottom: "0.5rem",
                margin: "3rem 0"
              }}
            >
              During Badge Summit
            </div>
          )}
          {i === 0 && (
            <div
              style={{
                fontWeight: "bold",
                borderBottom: "1px solid black",
                paddingBottom: "0.5rem",
                margin: "0 0 3rem 0"
              }}
            >
              Post Badge Summit
            </div>
          )}
          <div className="grid">
            <div className="col-2">
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#0093ff"
                }}
              >
                Passions
              </div>
              <ul style={{ lineHeight: "1.1rem" }}>
                {passions.map((passion, i) => (
                  <li
                    style={{ marginBottom: "0.5rem" }}
                    key={`passion-${key}-${i}`}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 300,
                        fontStyle: "italic"
                      }}
                    >
                      {passionPrompts[i]}...
                    </div>
                    <div>{passion}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-2">
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#fd940d"
                }}
              >
                Purposes
              </div>
              <ul style={{ lineHeight: "1.1rem" }}>
                {purposes.map((purpose, i) => (
                  <li
                    style={{ marginBottom: "0.5rem" }}
                    key={`purpose-${key}-${i}`}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 300,
                        fontStyle: "italic"
                      }}
                    >
                      {purposePrompts[i]}...
                    </div>
                    <div>{purpose}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    });

    return <div className="container">{contents}</div>;
  }
}
