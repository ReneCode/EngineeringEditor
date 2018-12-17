import { IaEventType } from "./Interaction";
import * as actions from "../../actions";
import IaBase, { IaConfig } from "./IaBase";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import Placement from "../../model/Placement";

class IaPickItem extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  pickItems(pt: Point): Placement[] {
    const {
      canvas,
      viewport,
      items,
      cursor,
    } = this.props.getState().graphic;
    const transform = new TransformCoordinate(viewport, canvas);
    const pickRadius = transform.canvasLengthToWc(
      cursor.radiusScreen,
    );
    const pickedPlacements = items.filter(p =>
      p.nearPoint(pt, pickRadius),
    );
    return pickedPlacements;
  }

  start = async (
    args: any[],
  ): Promise<null | { items: Placement[]; point: Point }> => {
    try {
      if (args && args.length > 0) {
        this.props.dispatch(actions.setCursorMode(args[0]));
      }
      const result = await this.props.getPoint([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        return null;
      }
      const point = result.pointWc;
      const items = this.pickItems(point);
      this.props.dispatch(actions.setCursorMode());

      return { items, point };
    } finally {
    }
  };
}

export default IaPickItem;
