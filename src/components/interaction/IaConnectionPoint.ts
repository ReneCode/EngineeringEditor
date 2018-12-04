import IaBase, { IaConfig } from "./IaBase";
import GraphicPolygon from "../../model/graphic/GraphicPolygon";
import { IaEventType } from "./Interaction";
import * as actions from "../../actions";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "../../model/graphic/GraphicConnectionPoint";
import GraphicBase from "../../model/graphic/GraphicBase";
import { RelativeDirection } from "../../common/point";

class IaConnectionPoint extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let connectionPoint:
        | GraphicConnectionPoint
        | undefined = undefined;
      // place graphic
      while (run) {
        const result = await this.props.getPoint([
          IaEventType.mouseDown,
          IaEventType.mouseMove,
        ]);
        if (!result) {
          this.props.dispatch(actions.setTempItem());
          return;
        }
        connectionPoint = new GraphicConnectionPoint(result.pointWc);
        this.props.dispatch(actions.setTempItem(connectionPoint));

        switch (result.type) {
          case IaEventType.mouseDown:
            run = false;
            break;
        }
      }

      if (connectionPoint) {
        // set direction
        run = true;
        while (run) {
          const result = await this.props.getPoint([
            IaEventType.mouseUp,
            IaEventType.mouseMove,
          ]);

          switch (result.type) {
            case IaEventType.mouseUp:
              run = false;
              break;
            default:
              const dir = connectionPoint.pt.relativeDirection(
                result.pointWc,
              );
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
              this.props.dispatch(
                actions.setTempItem(connectionPoint),
              );
          }
        }

        this.saveGraphic(connectionPoint);
      }
    } catch (ex) {}
  };
}

export default IaConnectionPoint;
