import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import {
  IA_SELECT,
  IA_CREATE_CIRCLE,
  IA_CREATE_LINE,
  IA_ZOOM_WINDOW,
  IA_DELETE_ITEM,
  IA_CREATE_SYMBOL,
  IA_CREATE_POLYGON,
  IA_CREATE_CONNECTION_POINT,
  IA_CREATE_TEXT,
} from "../../actions/interactionTypes";
import { zoomFullAction } from "../../actions/zoomFull";

interface IProps {
  dispatch: Function;
}

class DrawingWorkspace extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onZoomFull = () => {
    this.props.dispatch(zoomFullAction());
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
          onClick={() => this.startIa(IA_CREATE_TEXT)}>
          Text
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_SYMBOL)}>
          Create Symbol
        </button>
        <button className="button" onClick={this.onSelectSymbol}>
          Place Symbol
        </button>
        <button className="button" onClick={this.onZoomFull}>
          Zoom full
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
      </div>
    );
  }
}

export default connect()(DrawingWorkspace);
