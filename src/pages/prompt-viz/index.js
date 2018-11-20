import React, { PureComponent, Component } from "react";
import { observer } from "mobx-react";
import Container from "../../components/container";
import { passionPrompts, purposePrompts } from "../../data";
import fullscreenSvg from "../../images/arrows-alt-solid.svg";
import closeSvg from "../../images/times-solid.svg";
import style from "./index.module.scss";
import PageWrapper from "../../components/page-wrapper";

import ReactTable from "react-table";
import "react-table/react-table.css";
import classJoin from "../../utils/class-join";

class Option extends PureComponent {
  render() {
    const { value, ...otherProps } = this.props;
    return (
      <label style={{ display: "block" }}>
        <input type="checkbox" style={{ marginRight: "0.25rem" }} value={value} {...otherProps} />
        {value}
      </label>
    );
  }
}

class AnswerList extends PureComponent {
  render() {
    const { heading, responses } = this.props;
    return (
      <div className={style.column}>
        <h2>{heading}</h2>
        <ul>
          {responses.map((r, i) => (
            <li key={`${i}-${i}`}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }
}

@observer
export default class PromptViz extends Component {
  state = {
    selectedPassions: [passionPrompts[0]],
    selectedPurposes: [purposePrompts[0]],
    fullscreen: false
  };

  togglePassionOption = event => {
    const passion = event.target.value;
    const selectedPassions = this.state.selectedPassions;
    const newPassions = selectedPassions.includes(passion)
      ? selectedPassions.filter(p => p !== passion)
      : [...selectedPassions, passion];
    this.setState({ selectedPassions: newPassions });
  };

  togglePurposeOption = event => {
    const purpose = event.target.value;
    const selectedPurposes = this.state.selectedPurposes;
    const newPurposes = selectedPurposes.includes(purpose)
      ? selectedPurposes.filter(p => p !== purpose)
      : [...selectedPurposes, purpose];
    this.setState({ selectedPurposes: newPurposes });
  };

  render() {
    const { store } = this.props;
    const { selectedPassions, selectedPurposes, fullscreen } = this.state;
    const { allPurposes, allPassions, numResponses } = store;
    const selectedPassionIndices = selectedPassions.map(p => passionPrompts.indexOf(p));
    const selectedPurposeIndices = selectedPurposes.map(p => purposePrompts.indexOf(p));

    let headings = [
      selectedPassions.map(p => (
        <th className={style.passionHeader} scope="col" key={p}>
          <div className={style.cell}>{p}</div>
        </th>
      )),
      selectedPurposes.map(p => (
        <th className={style.purposeHeader} scope="col" key={p}>
          <div className={style.cell}>{p}</div>
        </th>
      ))
    ];

    let rows = [];
    for (let rowIndex = 0; rowIndex < numResponses; rowIndex++) {
      rows.push(
        <tr key={rowIndex}>
          {selectedPassionIndices.map(passionIndex => (
            <td>
              <div className={style.cell}>{allPassions[passionIndex][rowIndex]}</div>
            </td>
          ))}
          {selectedPurposeIndices.map(purposeIndex => (
            <td>
              <div className={style.cell}>{allPurposes[purposeIndex][rowIndex]}</div>
            </td>
          ))}
        </tr>
      );
    }

    return (
      <PageWrapper>
        <Container style={{ textAlign: "center" }}>
          <form className={style.controls}>
            <div className={style.passionControls}>
              <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Passions</div>
              {passionPrompts.map(prompt => (
                <Option
                  key={prompt}
                  value={prompt}
                  checked={selectedPassions.includes(prompt)}
                  onClick={this.togglePassionOption}
                />
              ))}
            </div>
            <div className={style.purposeControls}>
              <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Purposes</div>
              {purposePrompts.map(prompt => (
                <Option
                  key={prompt}
                  value={prompt}
                  checked={selectedPurposes.includes(prompt)}
                  onClick={this.togglePurposeOption}
                />
              ))}
            </div>
          </form>
          <button onClick={() => this.setState({ fullscreen: true })} className={style.button}>
            Go Fullscreen
          </button>
          <div className={classJoin(style.tableArea, fullscreen && style.fullscreen)}>
            {fullscreen && (
              <button onClick={() => this.setState({ fullscreen: false })} className={style.button}>
                Minimize
              </button>
            )}
            <div className={style.tableWrap}>
              <table className={style.table}>
                <thead>
                  <tr>{headings}</tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
        </Container>
      </PageWrapper>
    );
  }
}
