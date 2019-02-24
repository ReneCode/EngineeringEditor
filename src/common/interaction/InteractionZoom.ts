import InteractionBase from "./InteractionBase";

import Paper, { Point, Shape, Size } from "paper";

class InteractionZoom extends InteractionBase {
  rect: Paper.Shape | null = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);

  onMouseDown(event: Paper.MouseEvent) {
    this.firstPoint = event.point;

    this.rect = Shape.Rectangle(event.point, event.point);
    this.rect.strokeColor = "green";
  }

  onMouseDrag(event: Paper.MouseEvent) {
    if (this.rect) {
      const delta = event.point.subtract(this.firstPoint).abs();
      const p1 = Point.min(this.firstPoint, event.point);
      this.rect.set({
        position: [p1.x + delta.x / 2, p1.y + delta.y / 2],
        size: [delta.x, delta.y],
      });
    }
  }

  onMouseUp(event: Paper.MouseEvent) {
    if (this.rect) {
      Paper.view.scale(1.5, this.rect.position);
      this.rect.remove();
    }
  }
}

export default InteractionZoom;
