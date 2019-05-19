import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import { zoomFullAction } from "../../actions/zoomFull";
import { undoAction, redoAction } from "../../actions/undoRedo";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

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

  onUndo = () => {
    this.props.dispatch(undoAction());
  };
  onRedo = () => {
    this.props.dispatch(redoAction());
  };

  onSelectSymbol = () => {
    this.props.dispatch(actions.showModal("selectSymbol"));
  };

  startIa = (ia: string) => {
    this.props.dispatch(actions.startInteraction(ia));

    // switch (ia) {
    //   case IA_ZOOM_WINDOW:
    //     appEventDispatcher.dispatch({
    //       type: "startInteraction",
    //       payload: new IaZoom(),
    //     });
    //     break;

    //   case IA_SELECT:
    //     appEventDispatcher.dispatch({
    //       type: "startInteraction",
    //       payload: new IaSelect(),
    //     });
    //     break;
    // }
  };

  startInteraction = (name: string) => {
    appEventDispatcher.dispatch("startInteraction", name);
  };

  render() {
    return (
      <div className="drawingworkspace">
        <button
          className="button"
          onClick={() => this.startInteraction("Idle")}>
          Idle
        </button>
        <button
          className="button"
          onClick={() => this.startInteraction("CreateArc")}>
          Arc
        </button>
        <button
          className="button"
          onClick={() => this.startInteraction("CreateLine")}>
          Line
        </button>
        <button
          className="button"
          onClick={() => this.startInteraction("Circle")}>
          Circle
        </button>
        <button
          className="button"
          onClick={() => this.startInteraction("Rectangle")}>
          Rectangle
        </button>
        {/* <button
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
          onClick={() => this.startInteraction("Zoom")}>
          Zoom window
        </button>
        <button
          className="button"
          onClick={() => this.startIa(IA_CREATE_CONNECTION_POINT)}>
          Connection Point
        </button> */}
        <button className="button" onClick={this.onUndo}>
          Undo
        </button>
        <button className="button" onClick={this.onRedo}>
          Redo
        </button>
      </div>
    );
  }
}

export default connect()(DrawingWorkspace);
