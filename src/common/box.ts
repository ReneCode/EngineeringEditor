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

  center(): Point {
    return new Point(
      this.p1.x + this.width() / 2,
      this.p1.y + this.height() / 2,
    );
  }

  x(): number {
    return this.p1.x;
  }
  y(): number {
    return this.p1.y;
  }

  width(): number {
    return this.p2.x - this.p1.x;
  }

  height(): number {
    return this.p2.y - this.p1.y;
  }

  add(pt: Point): Box {
    return new Box(this.p1.add(pt), this.p2.add(pt));
  }

  sub(pt: Point): Box {
    return new Box(this.p1.sub(pt), this.p2.sub(pt));
  }

  expandByPoint(pt: Point): Box {
    return new Box(
      new Point(Math.min(this.p1.x, pt.x), Math.min(this.p1.y, pt.y)),
      new Point(Math.max(this.p2.x, pt.x), Math.max(this.p2.y, pt.y)),
    );
  }

  expandByBox(box: Box): Box {
    return new Box(
      new Point(
        Math.min(this.p1.x, box.p1.x),
        Math.min(this.p1.y, box.p1.y),
      ),
      new Point(
        Math.max(this.p2.x, box.p2.x),
        Math.max(this.p2.y, box.p2.y),
      ),
    );
  }

  // box is inside or partly inside this
  intersect(box: Box): boolean {
    return (
      this.isPointInside(box.bottomLeft()) ||
      this.isPointInside(box.bottomRight()) ||
      this.isPointInside(box.topLeft()) ||
      this.isPointInside(box.topRight())
    );
  }

  isPointInside(pt: Point): boolean {
    return (
      this.p1.x <= pt.x &&
      pt.x <= this.p2.x &&
      this.p1.y <= pt.y &&
      pt.y <= this.p2.y
    );
  }

  isLineInside(line: Line): boolean {
    if (line.p1.x < this.p1.x && line.p2.x < this.p1.x) {
      // line left
      return false;
    }
    if (line.p1.y < this.p1.y && line.p2.y < this.p1.y) {
      // line buttom
      return false;
    }
    if (line.p1.x > this.p2.x && line.p2.x > this.p2.x) {
      // line right
      return false;
    }
    if (line.p1.y > this.p2.y && line.p2.y > this.p2.y) {
      // line buttom
      return false;
    }

    return true;
  }
}
