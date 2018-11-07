import React, { PureComponent, Component } from "react";
import { observer } from "mobx-react";
import Container from "../../components/container";
import { passionPrompts, purposePrompts } from "../../data";
import { Grid, Column2 } from "../../components/grid";
import style from "./index.module.scss";

class Option extends PureComponent {
  render() {
    const { value, ...otherProps } = this.props;
    return (
      <label style={{ display: "block" }}>
        <input type="checkbox" value={value} {...otherProps} />
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
    selectedPassions: [],
    selectedPurposes: []
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
    const { selectedPassions, selectedPurposes } = this.state;
    const { allPurposes, allPassions, numResponses } = store;
    const selectedPassionIndices = selectedPassions.map(p => passionPrompts.indexOf(p));
    const selectedPurposeIndices = selectedPurposes.map(p => purposePrompts.indexOf(p));

    const fixedWidthStyle = {
      width: `${100 / (selectedPassions.length + selectedPurposes.length)}%`
    };
    let headings = [
      selectedPassions.map(p => (
        <th className={style.passionHeader} style={fixedWidthStyle} scope="col" key={p}>
          {p}
        </th>
      )),
      selectedPurposes.map(p => (
        <th className={style.purposeHeader} style={fixedWidthStyle} scope="col" key={p}>
          {p}
        </th>
      ))
    ];

    let rows = [];
    for (let rowIndex = 0; rowIndex < numResponses; rowIndex++) {
      rows.push(
        <tr key={rowIndex}>
          {selectedPassionIndices.map(passionIndex => (
            <td style={fixedWidthStyle}>{allPassions[passionIndex][rowIndex]}</td>
          ))}
          {selectedPurposeIndices.map(purposeIndex => (
            <td style={fixedWidthStyle}>{allPurposes[purposeIndex][rowIndex]}</td>
          ))}
        </tr>
      );
    }

    return (
      <Container>
        <form>
          <Grid>
            <Column2>
              <h2>Passions</h2>
              {passionPrompts.map(prompt => (
                <Option
                  key={prompt}
                  value={prompt}
                  checked={selectedPassions.includes(prompt)}
                  onClick={this.togglePassionOption}
                />
              ))}
            </Column2>
            <Column2>
              <h2>Purposes</h2>
              {purposePrompts.map(prompt => (
                <Option
                  key={prompt}
                  value={prompt}
                  checked={selectedPurposes.includes(prompt)}
                  onClick={this.togglePurposeOption}
                />
              ))}
            </Column2>
          </Grid>
        </form>
        <div style={{ overflowX: "auto" }}>
          <table className={style.table}>
            <thead>
              <tr>{headings}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </Container>
    );
  }
}
