import GraphicLine from "../../model/graphic/GraphicLine";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import { setTempItem } from "../../actions";
import { createPlacementAction } from "../../actions/placementActions";
import { createElementAction } from "../../actions/changeElementActions";

class IaLine extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    /*    try {
      let run = true;
      let nPoints = 0;
      let line = new GraphicLine(new Point(), new Point());
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
        if (result.type === IaEventType.keyDown) {
          // TODO keyboard commands (h = horizontal,v = vertical)
          // please take a reuseable solution
        } else {
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
            await this.context.dispatch(setTempItem(line));

            if (
              result.type === IaEventType.mouseUp ||
              result.type === IaEventType.mouseDown
            ) {
              // finish
              if (!secondPoint.equal(startPoint)) {
                await this.context.dispatch(
                  createElementAction("placement", line),
                );
                this.context.dispatch(setTempItem());
                run = false;
              }
            }
          }
        }
      }
      return { restart: true };
    } finally {
    }
    */
  };
}

export default IaLine;
