import Paper from "paper";
import InteractionBase from "./InteractionBase";
import PaperUtil from "../../utils/PaperUtil";
import GraphicCircle from "../../model/graphic/GraphicCircle";
import Point from "../point";
import { createElementAction } from "../../actions/createElement";

const FILL_COLOR = "#339933cc";
const COLOR = "#335511";

class InteractionCircle extends InteractionBase {
  circle: Paper.Path | null = null;
  start: Paper.Point = new Paper.Point(0, 0);
  radius: number = 0;

  onMouseDown(event: Paper.MouseEvent) {
    this.start = event.point;
    this.createCircle(this.start, 0);
  }

  onMouseDrag(event: Paper.MouseEvent) {
    if (this.circle) {
      // typescript-disable-next-line
      const diff = event.point.subtract(this.start);
      this.radius = diff.length;
      this.createCircle(this.start, this.radius);
    }
  }

  onMouseUp(event: Paper.MouseEvent) {
    if (this.circle) {
      this.circle.strokeColor = "black";
      this.finish();
      this.circle = null;
    }
  }

  private async finish() {
    if (!this.circle) {
      throw new Error("circle not set");
    }

    const circle = new GraphicCircle(
      new Point(this.start.x, this.start.y),
      this.radius,
    );
    circle.fill = FILL_COLOR;
    circle.color = COLOR;
    await this.context.dispatch(
      createElementAction("placement", circle),
    );
  }

  private createCircle(center: Paper.Point, radius: number) {
    if (this.circle) {
      this.circle.remove();
    }
    this.circle = new Paper.Path.Circle(center, radius);
    this.circle.strokeColor = COLOR;
    this.circle.fillColor = FILL_COLOR;
  }
}

export default InteractionCircle;
