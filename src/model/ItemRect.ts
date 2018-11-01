import ItemBase from "./ItemBase";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";

class ItemRect extends ItemBase {
  p1: Point;
  p2: Point;
  constructor(pageId: string, p1: Point, p2: Point) {
    super(pageId, "rect");
    this.p1 = p1 || new Point(0, 0);
    this.p2 = p2 || new Point(0, 0);
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    const p1 = transform.wcToCanvas(this.p1);
    const p2 = transform.wcToCanvas(this.p2);
    // x, y, width, height
    context.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    context.stroke();
  }

  translate(pt: Point) {
    return new ItemRect(
      this.pageId,
      this.p1.add(pt),
      this.p2.add(pt),
    );
  }
}

export default ItemRect;
