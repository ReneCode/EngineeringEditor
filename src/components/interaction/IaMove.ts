import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import deepClone from "../../common/deepClone";
import IaPickItem from "./IaPickItem";
import ItemBase from "../../model/ItemBase";

class IaMove extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async (args: any[]) => {
    try {
      let run = true;
      let firstPoint = new Point();

      const iaPickItem = new IaPickItem(this.context);
      const result = await iaPickItem.start(["select"]);
      if (!result) {
        return;
      }
      await this.context.dispatch(
        actions.addSelectedItem(result.items),
      );
      firstPoint = result.point;

      const items = this.context.getState().graphic.selectedItems;
      const orginalItems = deepClone(items);
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseUp,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.context.dispatch(actions.clearSelectedItem());
          return;
        }
        const secondPoint = result.pointWc;
        const delta = secondPoint.sub(firstPoint);
        const movedItems = orginalItems.map((item: ItemBase) =>
          item.translate(delta),
        );

        switch (result.type) {
          case IaEventType.mouseUp:
            console.log("up");
            this.context.dispatch(actions.clearSelectedItem());
            if (!firstPoint.equal(secondPoint)) {
              this.context.dispatch(
                actions.updatePlacement(movedItems),
              );
              this.context.dispatch(
                actions.apiUpdatePlacement(movedItems),
              );
            }
            run = false;
            break;

          case IaEventType.mouseMove:
            this.context.dispatch(actions.clearSelectedItem());
            this.context.dispatch(
              actions.addSelectedItem(movedItems),
            );
            break;
        }
      }
      return;
    } finally {
    }
  };
}

export default IaMove;
