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
  IA_CREATE_GROUP,
  IA_CREATE_SYMBOL,
} from "../../actions/interactionTypes";

interface IProps {
  dispatch: Function;
}

class DrawingWorkspace extends Component<IProps> {
  constructor(props: IProps) {
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

  onGroup = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_GROUP));
  };
  onCreateSymbol = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_SYMBOL));
  };
  onSelectSymbol = () => {
    this.props.dispatch(actions.showModal("selectSymbol"));
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
        <button className="button" onClick={this.onDelete}>
          Delete
        </button>

        <button className="button" onClick={this.onLine}>
          Line
        </button>
        <button className="button" onClick={this.onCircle}>
          Circle
        </button>
        <button className="button" onClick={this.onCreateSymbol}>
          Create Symbol
        </button>
        <button className="button" onClick={this.onSelectSymbol}>
          Place Symbol
        </button>
        <button className="button" onClick={this.onZoomWindow}>
          Zoom window
        </button>
      </div>
    );
  }
}

export default connect()(DrawingWorkspace);
