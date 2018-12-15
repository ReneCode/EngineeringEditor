import IaBase, { IaConfig } from "./IaBase";
import { IaEventType } from "./Interaction";
import * as actions from "../../actions";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "../../model/graphic/GraphicConnectionPoint";
import Point, { RelativeDirection } from "../../common/point";

class IaConnectionPoint extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let nPoints = 0;
      let firstPoint = new Point();
      let connectionPoint = new GraphicConnectionPoint(new Point());
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
          firstPoint = result.pointWc;
          connectionPoint.pt = firstPoint;
          switch (result.type) {
            case IaEventType.mouseDown:
              nPoints++;
              break;
          }
          this.props.dispatch(actions.setTempItem(connectionPoint));
        } else {
          const nextPoint = result.pointWc;

          if (
            result.type === IaEventType.mouseDown ||
            result.type === IaEventType.mouseUp
          ) {
            if (!nextPoint.equal(firstPoint)) {
              this.saveGraphic(connectionPoint);
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
            this.props.dispatch(actions.setTempItem(connectionPoint));
          }
        }
      }
      return true;
    } catch (ex) {}
  };
}

export default IaConnectionPoint;
