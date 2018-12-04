import { IaEventType } from "./Interaction";
import { IGlobalState } from "../../reducers";
import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";
import IaBase, { IaConfig } from "./IaBase";
import Point from "../../common/point";
import GraphicRect from "../../model/graphic/GraphicRect";
import TransformCoordinate from "../../common/transformCoordinate";

class IaZoomWindow extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let rect = new GraphicRect(new Point(), new Point());
      let startPoint = new Point();
      while (run) {
        const result = await this.props.getPoint([
          IaEventType.mouseUp,
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (
          !result ||
          (result.type === IaEventType.keyDown &&
            result.event.key === "Escape")
        ) {
          this.props.dispatch(actions.setTempItem());
          return;
        }
        if (nPoints === 0) {
          // get first Point
          switch (result.type) {
            case IaEventType.mouseDown:
              nPoints++;
              startPoint = result.pointWc;
              rect = new GraphicRect(startPoint, startPoint);
              break;
          }
        } else {
          const secondPoint = result.pointWc;
          rect.p2 = secondPoint;
          this.props.dispatch(actions.setTempItem(rect));

          if (
            result.type === IaEventType.mouseUp ||
            result.type === IaEventType.mouseDown
          ) {
            // finish
            if (!secondPoint.equal(startPoint)) {
              this.props.dispatch(actions.setTempItem());
              this.setViewport(startPoint, secondPoint);
              run = false;
            }
          }
        }
      }
      return true; // restart
    } finally {
    }
  };

  setViewport = (p1: Point, p2: Point) => {
    const x1 = Math.min(p1.x, p2.x);
    const x2 = Math.max(p1.x, p2.x);
    const y1 = Math.min(p1.y, p2.y);
    const y2 = Math.max(p1.y, p2.y);
    const width = x2 - x1;
    const height = y2 - y1;
    const viewport = {
      x: x1,
      y: y1,
      width: width,
      height: height,
    };
    const canvas = this.props.state.graphic.canvas;
    const tc = new TransformCoordinate(viewport, canvas);
    const correctedViewport = tc.viewport;
    this.props.dispatch(
      actions.setViewport(
        correctedViewport.x,
        correctedViewport.y,
        correctedViewport.width,
        correctedViewport.height,
      ),
    );
  };
}

export default IaZoomWindow;
