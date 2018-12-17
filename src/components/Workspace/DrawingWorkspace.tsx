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
  IA_CREATE_POLYGON,
  IA_CREATE_CONNECTION_POINT,
} from "../../actions/interactionTypes";

interface IProps {
  dispatch: Function;
}

class DrawingWorkspace extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onMove = () => {
    this.props.dispatch(actions.startInteraction(IA_MOVE));
  };

  onGroup = () => {
    this.props.dispatch(actions.startInteraction(IA_CREATE_GROUP));
  };
  onSelectSymbol = () => {
    this.props.dispatch(actions.showModal("selectSymbol"));
  };

  startIa = (ia: string) => {
    this.props.dispatch(actions.startInteraction(ia));
  };

  render() {
    return (
      <div className="drawingworkspace">
        <button
          className="button"
          onClick={() => this.startIa(IA_SELECT)}>
          Select
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_DELETE_ITEM)}>
          Delete
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_LINE)}>
          Line
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_CIRCLE)}>
          Circle
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_POLYGON)}>
          Polygon
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_SYMBOL)}>
          Create Symbol
        </button>
        <button className="button" onClick={this.onSelectSymbol}>
          Place Symbol
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_ZOOM_WINDOW)}>
          Zoom window
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_CONNECTION_POINT)}>
          Connection Point
        </button>

        <button
          className="button"
          onClick={() => this.startIa(IA_MOVE)}>
          Move
        </button>
      </div>
    );
  }
}

export default connect()(DrawingWorkspace);
