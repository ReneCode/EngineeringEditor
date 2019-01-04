import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import GraphicCircle from "../../model/graphic/GraphicCircle";
import { setTempItem } from "../../actions";
import { createPlacementAction } from "../../actions/placementActions";

class IaCircle extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let circle = new GraphicCircle(new Point(), 0);
      let middlePoint = new Point();
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
              middlePoint = result.pointWc;
              circle.pt = middlePoint;
              break;
          }
        } else {
          const secondPoint = result.pointWc;
          const radius = secondPoint.sub(middlePoint).length();
          circle.radius = radius;
          this.context.dispatch(setTempItem(circle));

          if (
            result.type === IaEventType.mouseUp ||
            result.type === IaEventType.mouseDown
          ) {
            // finish
            if (!secondPoint.equal(middlePoint)) {
              this.context.dispatch(createPlacementAction(circle));
              this.context.dispatch(setTempItem());
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

export default IaCircle;
