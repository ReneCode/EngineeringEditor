import IaBase, { IaContext, IaEventType } from "./IaBase";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "../../model/graphic/GraphicConnectionPoint";
import Point, { RelativeDirection } from "../../common/point";
import { setTempItem } from "../../actions";
import { createPlacementAction } from "../../actions/placementActions";

class IaConnectionPoint extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let firstPoint = new Point();
      let connectionPoint = new GraphicConnectionPoint(new Point());
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
        if (
          result.type === IaEventType.mouseUp ||
          result.type === IaEventType.mouseDown ||
          result.type === IaEventType.mouseMove
        ) {
          if (nPoints === 0) {
            firstPoint = result.pointWc;
            connectionPoint.pt = firstPoint;
            switch (result.type) {
              case IaEventType.mouseDown:
                nPoints++;
                break;
            }
            this.context.dispatch(setTempItem(connectionPoint));
          } else {
            const nextPoint = result.pointWc;

            if (
              result.type === IaEventType.mouseDown ||
              result.type === IaEventType.mouseUp
            ) {
              if (!nextPoint.equal(firstPoint)) {
                this.context.dispatch(
                  createPlacementAction(connectionPoint),
                );
                run = false;
              }
            } else {
              // mouse move
              const dir = firstPoint.relativeDirection(nextPoint);
              switch (dir) {
                case RelativeDirection.Right:
                  connectionPoint.direction =
                    ConnectionPointDirection.RIGHT;
                  break;
                case RelativeDirection.Up:
                  connectionPoint.direction =
                    ConnectionPointDirection.UP;
                  break;
                case RelativeDirection.Left:
                  connectionPoint.direction =
                    ConnectionPointDirection.LEFT;
                  break;
                case RelativeDirection.Down:
                  connectionPoint.direction =
                    ConnectionPointDirection.DOWN;
              }
              this.context.dispatch(setTempItem(connectionPoint));
            }
          }
        }
      }
      return { restart: true };
    } catch (ex) {}
  };
}

export default IaConnectionPoint;
