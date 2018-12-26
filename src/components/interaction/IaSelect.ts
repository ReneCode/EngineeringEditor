import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import IaRectRubberband, {
  IaRectRubberbandResult,
} from "./IaRectRubberband";
import Box from "../../common/box";
import IaMove from "./IaMove";
import * as actionTypes from "../../actions/actionTypes";
import { deletePlacement } from "../../actions";

class IaSelect extends IaBase {
  constructor(context: IaContext) {
    super(context);
  }

  selectFromRect({ p1, p2 }: IaRectRubberbandResult) {
    // null-size box is invalid
    if (p1.equal(p2)) {
      return;
    }
    const box = new Box(p1, p2);
    const items = this.context
      .getState()
      .graphic.items.filter(g => g.insideBox(box));
    this.context.dispatch(actions.addSelectedItem(items));
  }

  async start() {
    try {
      this.context.dispatch(actions.setCursorMode("select"));

      const result = await this.context.getEvent([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        this.context.dispatch(actions.setCursorMode());
        return;
      }
      if (result.type === IaEventType.keyDown) {
        const event = result.event as KeyboardEvent;
        let itemsToDelete = this.context.getState().graphic
          .selectedItems;
        if (itemsToDelete.length > 0) {
          if (event.key === "Backspace") {
            await this.context.dispatch(
              deletePlacement(itemsToDelete),
            );
          }
        }
      }
      if (result.type === IaEventType.mouseDown) {
        const items = this.pickItems(result.pointWc);
        const firstPoint = result.pointWc;
        if (items.length === 0) {
          // no item picked => select by rect-rubberband
          this.context.dispatch(actions.clearSelectedItem());

          const iaRectRubberband = new IaRectRubberband(this.context);
          const result = await iaRectRubberband.start(firstPoint);
          if (result) {
            this.selectFromRect(result);
          }
        } else {
          // items selected => start moving
          this.context.dispatch(actions.addSelectedItem(items));
          const iaMove = new IaMove(this.context);
          await iaMove.start(firstPoint);
        }
      }
      this.context.dispatch(actions.setCursorMode());

      return { restart: true };
    } finally {
    }
  }
}

export default IaSelect;
