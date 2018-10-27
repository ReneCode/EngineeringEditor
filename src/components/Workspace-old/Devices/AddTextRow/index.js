import React, { Component } from "react";
import { Container } from "./elements";

import { RowContainer, Input } from "../../../common/elements";

class AddTextRow extends Component {
  state = {
    value: ""
  };

  handleChange = ev => {
    const value = ev.target.value;
    this.setState({
      value
    });
  };

  handleClick = ev => {
    if (this.props.onAdd(this.state.value)) {
      this.setState({
        value: ""
      });
    }
  };

  render() {
    return (
      <RowContainer>
        <button onClick={this.handleClick}>+</button>
        <Input
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="new"
        />
      </RowContainer>
    );
  }
}

export default AddTextRow;
