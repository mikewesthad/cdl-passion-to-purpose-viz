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

    return (
      <PageWrapper>
        <Container>
          {store.allResponses.map((response, i) => {
            const { id, passions, purposes, roomName, versionNumber, timestamp } = response;
            return (
              <div style={{ maxWidth: "700px", margin: "0 auto 1.5rem auto" }} key={id}>
                <div
                  style={{
                    fontWeight: "300",
                    fontSize: "0.6rem",
                    fontStyle: "italic",
                    margin: "0 0 0.3rem"
                  }}
                >
                  Room name: {roomName} (game v{versionNumber.replace(/-/g, ".")})
                  <br />
                  Time: {format(timestamp, "MM/DD/YYYY [at] hh:mma")}
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
                        <li style={{ marginBottom: "0.5rem" }} key={`passion-${id}-${i}`}>
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
                        <li style={{ marginBottom: "0.5rem" }} key={`purpose-${id}-${i}`}>
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
