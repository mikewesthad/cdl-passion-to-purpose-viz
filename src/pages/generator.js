import React from "react";
import Container from "../components/container";
import Prompt from "../components/prompt";
import Button from "../components/button";
import { pick } from "../utils/array-utils";
import { purposeVerbs } from "../data";
import PageWrapper from "../components/page-wrapper";

export default class Generator extends React.Component {
  state = {
    passion: "",
    purpose: ""
  };

  componentDidMount() {
    this.generate();
  }

  generate = () => {
    const { allResponses } = this.props.store;
    const { passions, purposes } = pick(allResponses);
    const passion = pick(passions);
    const purposesWithVerbs = purposes.map((purpose, i) => `${purposeVerbs[i]} ${purpose}`);
    const purpose = pick(purposesWithVerbs);
    this.setState({ passion, purpose });
  };

  render() {
    const { passion, purpose } = this.state;
    return (
      <PageWrapper centerOnPage={true}>
        <Container isSmall={true}>
          <Prompt passion={passion} purpose={purpose} />
          <Button style={{ display: "block", margin: "2rem auto 0 auto" }} onClick={this.generate}>
            Generate Another
          </Button>
        </Container>
      </PageWrapper>
    );
  }
}
