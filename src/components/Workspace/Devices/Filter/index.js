import React, { Component } from "react";

import Input, { RowContainer } from "./elements";

class Filter extends Component {
  state = {
    value: ""
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  handleChange = ev => {
    const value = ev.target.value;
    this.setState({
      value
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  handleClear = ev => {
    this.setState({
      value: ""
    });
    this.props.onSubmit("");
  };

  render() {
    return (
      <RowContainer>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Filter"
          />
        </form>
        <button onClick={this.handleClear}>X</button>
      </RowContainer>
    );
  }
}

export default Filter;
