import IaBase, { IaContext, IaEventType } from "./IaBase";
import Point from "../../common/point";
import { createPlacementAction } from "../../actions/placementActions";
import GraphicText from "../../model/graphic/GraphicText";
import { createElementAction } from "../../actions/changeElementActions";

class IaText extends IaBase {
  /*
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      let run = true;
      let text = new GraphicText("Text", new Point());
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.context.dispatch(setTempItem());
          return;
        }
        text.pt = result.pointWc;
        this.context.dispatch(setTempItem(text));

        if (
          result.type === IaEventType.mouseUp ||
          result.type === IaEventType.mouseDown
        ) {
          // finish
          this.context.dispatch(
            createElementAction("placement", text),
          );
          this.context.dispatch(setTempItem());
          run = false;
        }
      }
      return { restart: true };
    } finally {
    }
  };
  */
}

export default IaText;
