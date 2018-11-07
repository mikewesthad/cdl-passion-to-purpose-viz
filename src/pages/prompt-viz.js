import React, { Component } from "react";
import { observer } from "mobx-react";
import Container from "../components/container";

@observer
export default class PromptViz extends Component {
  render() {
    const { store } = this.props;

    const entries = Object.entries(store.data);
    entries.reverse(); // Sort from most recent to least recent

    return <Container>Insert viz!</Container>;
  }
}
