import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import {
  IA_CREATE_CIRCLE,
  IA_CREATE_LINE,
} from "../../actions/interactionTypes";

class DrawingWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLine = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_LINE));
  };

  onCircle = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_CIRCLE));
  };

  onZoomWindow = () => {
    this.props.dispatch(actions.zoomWindow());
  };
  render() {
    return (
      <div className="drawingworkspace">
        <button className="button" onClick={this.onLine}>
          Line
        </button>
        <button className="button" onClick={this.onCircle}>
          Circle
        </button>
        <button className="button" onClick={this.onZoomWindow}>
          Zoom window
        </button>
      </div>
    );
  }
}

export default connect()(DrawingWorkspace);
