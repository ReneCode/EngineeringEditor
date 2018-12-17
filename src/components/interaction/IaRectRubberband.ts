import * as actions from "../../actions";
import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import Placement from "../../model/Placement";
import GraphicRect from "../../model/graphic/GraphicRect";

export type IaRectRubberbandResult = { p1: Point; p2: Point };

class IaRectRubberband extends IaBase {
  constructor(context: IaContext) {
    super(context);
  }

  start = async (
    p1: Point,
  ): Promise<null | IaRectRubberbandResult> => {
    try {
      let rect = new GraphicRect(p1, p1);
      let run = true;

      while (run) {
        const result = await this.getEvent();
        if (!result) {
          this.context.dispatch(actions.setTempItem());
          return null;
        }

        const p2 = result.pointWc;
        switch (result.type) {
          case IaEventType.mouseMove:
            rect.p2 = p2;
            this.context.dispatch(actions.setTempItem(rect));
            break;
          case IaEventType.mouseDown:
          case IaEventType.mouseUp:
            // finish
            run = false;
            this.context.dispatch(actions.setTempItem());
            return { p1, p2 };
        }
      }
      return null;
    } catch (ex) {
      console.log("Exception:", ex);
      return null;
    }
  };
}

export default IaRectRubberband;
