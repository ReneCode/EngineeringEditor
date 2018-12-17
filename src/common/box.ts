import Point from "./point";
import Line from "./line";

export default class Box {
  constructor(private p1: Point, private p2: Point) {
    this.p1 = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
    this.p2 = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
  }

  bottomLeft(): Point {
    return this.p1;
  }
  bottomRight(): Point {
    return new Point(this.p2.x, this.p1.y);
  }
  topLeft(): Point {
    return new Point(this.p1.x, this.p2.y);
  }
  topRight(): Point {
    return this.p2;
  }

  // box is inside or partly inside this
  intersect(box: Box): boolean {
    return (
      this.inside(box.bottomLeft()) ||
      this.inside(box.bottomRight()) ||
      this.inside(box.topLeft()) ||
      this.inside(box.topRight())
    );
  }

  inside(pt: Point): boolean {
    return (
      this.p1.x <= pt.x &&
      pt.x <= this.p2.x &&
      this.p1.y <= pt.y &&
      pt.y <= this.p2.y
    );
  }
}
