import React, { Component } from "react";
import { observer } from "mobx-react";
import { passionPrompts, purposePrompts } from "../data";
import { Grid, Column2 } from "../components/grid";
import Container from "../components/container";
import format from "date-fns/format";
import PageWrapper from "../components/page-wrapper";

@observer
export default class Responses extends Component {
  render() {
    const { store } = this.props;
    const entries = Object.entries(store.allResponses);
    entries.reverse(); // Sort from most recent to least recent

    return (
      <PageWrapper>
        <Container>
          {entries.map(([key, value], i) => {
            const { passions, purposes, roomName, versionNumber, timestamp } = value;
            return (
              <div style={{ maxWidth: "700px", margin: "0 auto 1.5rem auto" }} key={key}>
                <div
                  style={{
                    fontWeight: "300",
                    fontSize: "0.6rem",
                    fontStyle: "italic",
                    margin: "0 0 0.3rem"
                  }}
                >
                  Room name: {roomName}
                  <br />
                  Time: {format(timestamp, "MM/DD/YYYY [at] hh:mma")}
                  <br />
                  Game Version: v{versionNumber.replace(/-/g, ".")}
                  <br />
                </div>
                <Grid>
                  <Column2>
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
                        <li style={{ marginBottom: "0.5rem" }} key={`passion-${key}-${i}`}>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 300,
                              fontStyle: "italic"
                            }}
                          >
                            {passionPrompts[i]}
                            ...
                          </div>
                          <div>{passion}</div>
                        </li>
                      ))}
                    </ul>
                  </Column2>

                  <Column2>
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
                        <li style={{ marginBottom: "0.5rem" }} key={`purpose-${key}-${i}`}>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 300,
                              fontStyle: "italic"
                            }}
                          >
                            {purposePrompts[i]}
                            ...
                          </div>
                          <div>{purpose}</div>
                        </li>
                      ))}
                    </ul>
                  </Column2>
                </Grid>
              </div>
            );
          })}
        </Container>
      </PageWrapper>
    );
  }
}
