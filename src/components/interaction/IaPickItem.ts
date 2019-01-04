import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import Placement from "../../model/Placement";

class IaPickItem extends IaBase {
  constructor(context: IaContext) {
    super(context);
  }

  start = async (
    ...args: any
  ): Promise<null | { items: Placement[]; point: Point }> => {
    try {
      if (args && args.length > 0) {
        this.context.dispatch(actions.setCursorModeAction(args[0]));
      }
      const result = await this.context.getEvent([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        return null;
      }
      const point = result.pointWc;
      const items = this.pickItems(point);
      this.context.dispatch(actions.setCursorModeAction());

      return { items, point };
    } finally {
    }
  };
}

export default IaPickItem;
