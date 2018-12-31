import React, { Component } from "react";
import { connect } from "react-redux";

import TransformCoordinate from "../common/transformCoordinate";

import { IGlobalState } from "../reducers";
import { IGraphicState } from "../reducers/graphicReducer";

interface IProps {
  graphic: IGraphicState;
}

class CursorPosition extends Component<IProps> {
  render() {
    const transform = new TransformCoordinate(
      this.props.graphic.viewport,
      this.props.graphic.canvas,
    );

    const { gridX, gridY } = this.props.graphic.canvas;
    const cursorWc = transform
      .canvasToWc(this.props.graphic.cursor.pt)
      .snap(gridX, gridY);

    return (
      <div className="showtop">
        x:
        {cursorWc.x} y:
        {cursorWc.y}
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    graphic: state.graphic,
  };
};

export default connect(mapStateToProps)(CursorPosition);
