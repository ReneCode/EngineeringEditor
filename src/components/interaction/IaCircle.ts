import { Component } from "react";
import { IaEventType } from "./Interaction";
import { IGlobalState } from "../../reducers";
import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";
import IaBase, { IaConfig } from "./IaBase";
import Point from "../../common/point";
import GraphicCircle from "../../model/graphic/GraphicCircle";

class IaCircle extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let circle = new GraphicCircle(new Point(), 0);
      let middlePoint = new Point();
      while (run) {
        const result = await this.props.getPoint([
          IaEventType.mouseUp,
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.props.dispatch(actions.setTempItem());
          return;
        }
        if (nPoints === 0) {
          // get first Point
          switch (result.type) {
            case IaEventType.mouseDown:
              nPoints++;
              middlePoint = result.pointWc;
              circle.pt = middlePoint;
              break;
          }
        } else {
          const secondPoint = result.pointWc;
          const radius = secondPoint.sub(middlePoint).length();
          circle.radius = radius;
          this.props.dispatch(actions.setTempItem(circle));

          if (
            result.type === IaEventType.mouseUp ||
            result.type === IaEventType.mouseDown
          ) {
            // finish
            if (!secondPoint.equal(middlePoint)) {
              this.saveGraphic(circle);
              run = false;
            }
          }
        }
      }
      return true; // restart
    } finally {
    }
  };
}

export default IaCircle;
