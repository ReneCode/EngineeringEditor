import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import Placement from "../../model/Placement";
import GraphicRect from "../../model/graphic/GraphicRect";
import { IA_MOVE } from "../../actions/interactionTypes";
import IaPickItem from "./IaPickItem";
import IaRectRubberband, {
  IaRectRubberbandResult,
} from "./IaRectRubberband";
import Box from "../../common/box";

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
        this.context.dispatch(actions.clearSelectedItem());

        const iaRectRubberband = new IaRectRubberband(this.context);
        const result = await iaRectRubberband.start(firstPoint);
        console.log(":", result);
        if (result) {
          this.selectFromRect(result);
        }
      } else {
        this.context.dispatch(actions.addSelectedItem(items));
      }
      return { restart: true };
      /*
      let rect = new GraphicRect(new Point(), new Point());
      let itemSelected = false;
      let run = true;
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseUp,
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.context.dispatch(actions.setCursorMode());
          this.context.dispatch(actions.setTempItem());

          return;
        }
        if (nPoint === 0) {
          switch (result.type) {
            case IaEventType.mouseDown:
              nPoint++;
              firstPoint = result.pointWc;
              const items = this.pickItems(firstPoint);
              itemSelected = items.length > 0;
              if (!itemSelected) {
                this.context.dispatch(actions.clearSelectedItem());
              } else {
                this.context.dispatch(actions.addSelectedItem(items));
              }
              break;
          }
        } else {
          const secondPoint = result.pointWc;
          switch (result.type) {
            case IaEventType.mouseUp:
            case IaEventType.mouseDown:
              if (secondPoint.equal(firstPoint)) {
                run = false;
              }
              break;

            case IaEventType.mouseMove:
              if (!itemSelected) {
                rect = new GraphicRect(firstPoint, secondPoint);
                this.context.dispatch(actions.setTempItem(rect));
              } else {
                run = false;
                this.context.dispatch(
                  actions.startInteraction(IA_MOVE, firstPoint),
                );
              }
              break;
          }
        }
      }
      this.context.dispatch(actions.setCursorMode());

      return true; // restart
      */
    } finally {
    }
  }
}

export default IaSelect;
