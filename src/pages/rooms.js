import React from "react";
import Container from "../components/container";
import PageWrapper from "../components/page-wrapper";
import { alphabeticalSort } from "../utils/array-utils";
import { format } from "date-fns";

export default class Rooms extends React.Component {
  render() {
    const { store } = this.props;
    const { roomNames, rooms } = store;
    const sortedNames = alphabeticalSort(roomNames.slice());

    return (
      <PageWrapper>
        <Container>
          Rooms currently in use:
          <ul style={{ marginLeft: "1rem", listStyleType: "disc" }}>
            {sortedNames.map(name => {
              const { responseCount, lastResponseTime, firstResponseTime } = rooms[name];
              return (
                <li key={name} style={{ margin: "1rem 0" }}>
                  <b>{name}</b>
                  <ul style={{ marginLeft: "0.5rem" }}>
                    <li>{responseCount} responses</li>
                    <li>Created at {format(firstResponseTime, "MM/DD/YYYY [at] hh:mma")}</li>
                    <li>Last updated at {format(lastResponseTime, "MM/DD/YYYY [at] hh:mma")}</li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </Container>
      </PageWrapper>
    );
  }
}
