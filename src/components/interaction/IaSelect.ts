import * as actions from "../../actions";
import IaBase, { IaContext } from "./IaBase";
import IaPickItem from "./IaPickItem";
import IaRectRubberband, {
  IaRectRubberbandResult,
} from "./IaRectRubberband";
import Box from "../../common/box";
import IaMove from "./IaMove";

class IaSelect extends IaBase {
  interactionStack: IaBase[] = [];

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
      const iaPickItem = new IaPickItem(this.context);
      const result = await iaPickItem.start("select");
      if (!result) {
        return;
      }

      const firstPoint = result.point;
      const items = result.items;
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
      return { restart: true };
    } finally {
    }
  }
}

export default IaSelect;
