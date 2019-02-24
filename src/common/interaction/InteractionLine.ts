import InteractionBase from "./InteractionBase";

import Paper from "paper";
import { createElementAction } from "../../actions/createElement";
import GraphicLine from "../../model/graphic/GraphicLine";
import Point from "../point";

class InteractionLine extends InteractionBase {
  line: Paper.Path | null = null;

  onMouseDown(event: Paper.MouseEvent) {
    this.line = new Paper.Path.Line(event.point, event.point);
    this.line.strokeColor = "blue";
  }

  onMouseDrag(event: Paper.MouseEvent) {
    if (this.line) {
      this.line.segments[1].point = event.point;
    }
  }

  onMouseUp(event: Paper.MouseEvent) {
    if (this.line) {
      this.line.strokeColor = "black";
      this.finish();
      this.line = null;
    }
  }

  async finish() {
    if (this.line) {
      const p1 = new Point(
        this.line.segments[0].point.x,
        this.line.segments[0].point.y,
      );
      const p2 = new Point(
        this.line.segments[1].point.x,
        this.line.segments[1].point.y,
      );
      const line = new GraphicLine(p1, p2);
      await this.context.dispatch(
        createElementAction("placement", line),
      );
    }
  }
}

export default InteractionLine;
