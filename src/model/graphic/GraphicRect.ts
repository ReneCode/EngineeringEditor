import Paper from "paper";
import Placement from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { Machine } from "xstate";

const rectMachine = Machine({
  id: "rect",
  initial: "idle",
  states: {},
});

class GraphicRect extends Placement {
  constructor(public p1: Paper.Point, public p2: Paper.Point) {
    super("rect");
  }

  static fromJSON(json: any): GraphicRect {
    const rect = Object.create(GraphicRect.prototype);
    return Object.assign(rect, json, {
      p1: PaperUtil.PointFromJSON(json.p1),
      p2: PaperUtil.PointFromJSON(json.p2),
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      p1: PaperUtil.PointToJSON(this.p1),
      p2: PaperUtil.PointToJSON(this.p2),
    };
  }
}

export default GraphicRect;
