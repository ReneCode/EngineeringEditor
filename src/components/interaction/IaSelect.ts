import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import IaPickItem from "./IaPickItem";
import IaRectRubberband, {
  IaRectRubberbandResult,
} from "./IaRectRubberband";
import Box from "../../common/box";
import IaMove from "./IaMove";

class IaSelect extends IaBase {
  constructor(context: IaContext) {
    super(context);
  }

  selectFromRect({ p1, p2 }: IaRectRubberbandResult) {
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
        console.log(result);
        let itemsToDelete = this.context.getState().graphic
          .selectedItems;
        if (itemsToDelete.length > 0) {
          if ((result.event as KeyboardEvent).key === "Backspace") {
            await this.context.dispatch(
              actions.removeItem(itemsToDelete),
            );
            await this.context.dispatch(
              actions.removeSelectedItem(itemsToDelete),
            );

            await this.context.dispatch(
              actions.apiDeletePlacement(itemsToDelete),
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
