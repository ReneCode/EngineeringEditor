import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import {
  IA_SELECT,
  IA_MOVE,
  IA_CREATE_CIRCLE,
  IA_CREATE_LINE,
  IA_ZOOM_WINDOW,
  IA_DELETE_ITEM,
} from "../../actions/interactionTypes";

class DrawingWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelect = () => {
    this.props.dispatch(actions.startInteraction(IA_SELECT));
  };
  onMove = () => {
    this.props.dispatch(actions.startInteraction(IA_MOVE));
  };

  onDelete = () => {
    this.props.dispatch(actions.startInteraction(IA_DELETE_ITEM));
  };

  onLine = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_LINE));
  };

  onCircle = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_CIRCLE));
  };

  onZoomWindow = () => {
    this.props.dispatch(actions.startInteraction(IA_ZOOM_WINDOW));
  };
  render() {
    return (
      <div className="drawingworkspace">
        <button className="button" onClick={this.onSelect}>
          Select
        </button>
        <button className="button" onClick={this.onMove}>
          Move
        </button>
        <button className="button" onClick={this.onDelete}>
          Delete Item
        </button>

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
