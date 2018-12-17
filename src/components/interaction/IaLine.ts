import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";

class IaLine extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let line = new GraphicLine(new Point(), new Point());
      let startPoint = new Point();
      while (run) {
        const result = await this.props.getEvent([
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
              startPoint = result.pointWc;
              line = new GraphicLine(startPoint, startPoint);
              break;
          }
        } else {
          const secondPoint = result.pointWc;
          line.p2 = secondPoint;
          this.props.dispatch(actions.setTempItem(line));

          if (
            result.type === IaEventType.mouseUp ||
            result.type === IaEventType.mouseDown
          ) {
            // finish
            if (!secondPoint.equal(startPoint)) {
              this.saveGraphic(line);
              run = false;
            }
          }
        }
      }
      return { restart: true };
    } finally {
    }
  };
}

export default IaLine;
