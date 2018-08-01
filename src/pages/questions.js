import React, { Component } from "react";
import { observer } from "mobx-react";
import { animateScroll } from "react-scroll";
import { toJS } from "mobx";
import { Grid, Column } from "../components/grid";
import Container from "../components/container";
import Prompt from "../components/prompt";
import Toast from "../components/toast";

@observer
export default class Questions extends Component {
  state = {
    renderedPermutations: null,
    shouldPullLatest: true
  };

  static getDerivedStateFromProps(props, state) {
    if (state.shouldPullLatest || state.renderedPermutations === null) {
      state.renderedPermutations = toJS(props.store.permutations);
      state.shouldPullLatest = false;
      return state;
    }
    return null;
  }

  updateToLatest = () => {
    this.setState(() => ({ shouldPullLatest: true }));
    animateScroll.scrollToTop();
  };

  render() {
    const { renderedPermutations } = this.state;
    const { permutations } = this.props.store;

    if (!renderedPermutations || !permutations) return null;

    // Fast comparision
    const hasUpdates = permutations.length !== renderedPermutations.length;

    return (
      <Container>
        <Toast shouldShow={hasUpdates} className="text-center">
          There are new responses! Click{" "}
          <span className="link" onClick={this.updateToLatest}>
            here
          </span>{" "}
          to update the page.
        </Toast>
        <Grid>
          {renderedPermutations.map(([passion, purpose], i) => (
            <Column key={i}>
              <Prompt passion={passion} purpose={purpose} isSmall />
            </Column>
          ))}
        </Grid>
      </Container>
    );
  }
}
