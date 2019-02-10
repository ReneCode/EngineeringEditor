import IaBase, { IaContext, IaEventType } from "./IaBase";
import IaRectRubberband, {
  IaRectRubberbandResult,
} from "./IaRectRubberband";
import Box from "../../common/box";
import IaMove from "./IaMove";
import {
  addSelectedItemAction,
  clearSelectedItem,
  setSelectedItemAction,
} from "../../actions/graphicActions";
import Placement from "../../model/Placement";
import { deleteElementAction } from "../../actions/createElement";
import { setCursorModeAction } from "../../actions/setCursorMode";

class IaSelect extends IaBase {
  constructor(context: IaContext) {
    super(context);
  }

  getItemsFromRect({ p1, p2 }: IaRectRubberbandResult): Placement[] {
    // null-size box is invalid
    if (p1.equal(p2)) {
      return [];
    }
    const box = new Box(p1, p2);
    const items = this.context
      .getState()
      .graphic.items.filter(p => p.pickable() && p.insideBox(box));
    return items;
  }

  async start() {
    try {
      this.context.dispatch(setCursorModeAction("select"));

      const result = await this.context.getEvent([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        this.context.dispatch(setCursorModeAction());
        return;
      }
      if (result.type === IaEventType.keyDown) {
        const event = result.event as KeyboardEvent;
        let itemsToDelete = this.context.getState().graphic
          .selectedItems;
        if (itemsToDelete.length > 0) {
          if (event.key === "Backspace") {
            await this.context.dispatch(
              deleteElementAction("placement", itemsToDelete),
            );
          }
        }
      }
      if (result.type === IaEventType.mouseDown) {
        // if shift-key is pressed, than the new selection
        // will be added to the old selection
        // otherwise the new selection will replace the old selection
        const event = result.event as MouseEvent;
        const items = this.pickItems(result.pointWc);
        const firstPoint = result.pointWc;
        if (items.length === 0) {
          // no item picked => select by rect-rubberband
          if (!event.shiftKey) {
            // will add seleted item , so do not clear the old selected items
            this.context.dispatch(clearSelectedItem());
          }

          const iaRectRubberband = new IaRectRubberband(this.context);
          const result = await iaRectRubberband.start(firstPoint);
          if (result) {
            const itemsInRect = this.getItemsFromRect(result);
            if (event.shiftKey) {
              this.context.dispatch(
                addSelectedItemAction(itemsInRect),
              );
            } else {
              this.context.dispatch(
                setSelectedItemAction(itemsInRect),
              );
            }
          }
        } else {
          // items selected => start moving
          if (event.shiftKey) {
            this.context.dispatch(addSelectedItemAction(items));
          } else {
            this.context.dispatch(setSelectedItemAction(items));
          }
          const iaMove = new IaMove(this.context);
          await iaMove.start(firstPoint);
        }
      }
      this.context.dispatch(setCursorModeAction());

      return { restart: true };
    } finally {
    }
  }
}

export default IaSelect;
