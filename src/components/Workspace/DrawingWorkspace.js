import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";

class DrawingWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLine = () => {
    this.props.dispatch(actions.createLine());
  };

  render() {
    return (
      <div className="drawingworkspace">
        <button className="button" onClick={this.onLine}>
          Line
        </button>
        <button className="button">Circle</button>
      </div>
    );
  }
}

export default connect()(DrawingWorkspace);
