import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import GraphicRect from "../../model/graphic/GraphicRect";
import TransformCoordinate from "../../common/transformCoordinate";
import { setTempItem } from "../../actions";
import { setViewportAction } from "../../actions/graphicActions";

class IaZoomWindow extends IaBase {
  /*
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let rect = new GraphicRect(new Point(), new Point());
      let startPoint = new Point();
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseUp,
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.context.dispatch(setTempItem());
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
          this.context.dispatch(setTempItem(rect));

          if (
            result.type === IaEventType.mouseUp ||
            result.type === IaEventType.mouseDown
          ) {
            // finish
            if (!secondPoint.equal(startPoint)) {
              this.context.dispatch(setTempItem());
              this.setViewport(startPoint, secondPoint);
              run = false;
            }
          }
        }
      }
      // return true; // restart
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
    const canvas = this.context.getState().graphic.canvas;
    const tc = new TransformCoordinate(viewport, canvas);
    const correctedViewport = tc.viewport;
    this.context.dispatch(
      setViewportAction(
        correctedViewport.x,
        correctedViewport.y,
        correctedViewport.width,
        correctedViewport.height,
      ),
    );
  };
  */
}

export default IaZoomWindow;
