import { IaEventType } from "./Interaction";
import * as actions from "../../actions";
import IaBase from "./IaBase";
import Point from "../../common/point";
import Placement from "../../model/Placement";
import TransformCoordinate from "../../common/transformCoordinate";

interface IPickItemResult {
  point: Point;
  items: Placement[];
}
class IaPickItem extends IaBase {
  start = async (args: string[]): Promise<IPickItemResult | null> => {
    try {
      if (args.length > 0) {
        this.props.dispatch(actions.setCursorMode(args[0]));
      }

      const result = await this.props.getPoint([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      this.props.dispatch(actions.setCursorMode());

      if (
        !result ||
        (result.type === IaEventType.keyDown &&
          result.event.key === "Escape")
      ) {
        return null;
      }
      switch (result.type) {
        case IaEventType.mouseDown:
          const point = result.pointWc;
          const items = this.getItems(point);
          return {
            point,
            items,
          };
        default:
          return null;
      }
    } catch (ex) {
      console.log("Exception on IaPickItem");
      return null;
    }
  };

  getItems = (point: Point): Placement[] => {
    const {
      canvas,
      viewport,
      items,
      cursor,
    } = this.props.state.graphic;
    const transform = new TransformCoordinate(viewport, canvas);
    const pickRadius = transform.canvasLengthToWc(
      cursor.radiusScreen,
    );
    return items.filter(item => item.nearPoint(point, pickRadius));
  };
}

export default IaPickItem;
