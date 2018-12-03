import { Component } from "react";
import { IaEventType } from "./Interaction";
import { IGlobalState } from "../../reducers";
import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";

interface IProps {
  getPoint: Function;
  dispatch: Function;
  state: IGlobalState;
}

class IaLine {
  props: IProps;

  constructor(props: IProps) {
    this.props = props;
  }

  start = async () => {
    let line;
    try {
      let result = await this.props.getPoint(IaEventType.mouseDown);
      if (!result) return;
      const startPoint = result.pointWc;
      line = new GraphicLine(startPoint, startPoint);
      this.props.dispatch(actions.setTempItem(line));
      let run = true;
      while (run) {
        result = await this.props.getPoint([
          IaEventType.mouseUp,
          IaEventType.mouseMove,
        ]);
        if (!result) {
          this.props.dispatch(actions.setTempItem());
          return;
        }
        const secondPoint = result.pointWc;
        line.p2 = secondPoint;
        this.props.dispatch(actions.setTempItem(line));

        if (result.type === IaEventType.mouseMove) {
          // rubberband
        } else {
          // finish
          this.props.dispatch(actions.setTempItem());
          if (!secondPoint.equal(startPoint)) {
            this.props.dispatch(actions.addGraphicItemThunk(line));
          }
          run = false;
        }
      }
    } finally {
    }
  };
}

export default IaLine;
