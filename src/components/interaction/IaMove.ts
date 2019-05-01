import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import deepClone from "../../common/deepClone";
import Placement from "../../model/Placement";
import {
  updateSelectedItem,
  setSelectedItemAction,
} from "../../actions/graphicActions";
import { updateElementAction } from "../../actions/changeElementActions";

class IaMove extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async (firstPoint: Point) => {
    try {
      if (!firstPoint) {
        throw new Error("firstPoint missing");
      }
      const items = this.context.getState().graphic.selectedItems;
      if (items.length === 0) {
        return;
      }
      const orginalItems = deepClone(items);
      let run = true;
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseUp,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.context.dispatch(setSelectedItemAction([]));
          return;
        }
        const secondPoint = result.pointWc;
        const delta = secondPoint.sub(firstPoint);
        const movedItems = orginalItems.map((item: Placement) =>
          item.translate(delta),
        );

        switch (result.type) {
          case IaEventType.mouseUp:
            if (!firstPoint.equal(secondPoint)) {
              await this.context.dispatch(
                updateElementAction("placement", movedItems),
              );
            }
            run = false;
            break;

          case IaEventType.mouseMove:
            this.context.dispatch(updateSelectedItem(movedItems));
            break;
        }
      }
      return;
    } finally {
    }
  };
}

export default IaMove;
