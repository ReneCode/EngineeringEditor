import Paper from "paper";
import InteractionBase from "./InteractionBase";

class InteractionCircle extends InteractionBase {
  circle: Paper.Path | null = null;
  start: Paper.Point = new Paper.Point(0, 0);

  onMouseDown(event: Paper.MouseEvent) {
    this.start = event.point;
    this.createCircle(this.start, 0, 0);
  }

  onMouseDrag(event: Paper.MouseEvent) {
    if (this.circle) {
      const dx = event.point.x - this.start.x;
      const dy = event.point.y - this.start.y;
      const topLeft = new Paper.Point(
        this.start.x - dx,
        this.start.y - dy,
      );
      this.createCircle(topLeft, dx * 2, dy * 2);
    }
  }

  createCircle(leftTop: Paper.Point, dx: number, dy: number) {
    const rect = new Paper.Rectangle(leftTop, new Paper.Size(dx, dy));
    if (this.circle) {
      this.circle.remove();
    }
    this.circle = new Paper.Path.Ellipse(rect);
    this.circle.strokeColor = "blue";
    this.circle.fillColor = "#ee225599";
  }
}

export default InteractionCircle;
