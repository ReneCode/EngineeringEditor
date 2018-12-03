import Matrix2d from "./matrix-2d";
import { snap } from "./snap";

export enum RelativeDirection {
  None,
  Right,
  Up,
  Left,
  Down,
}

export default class Point {
  x: number = 0;
  y: number = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // http://choly.ca/post/typescript-json/
  toJSON(): object {
    return (<any>Object).assign({}, this);
  }

  static fromJSON(json: object): Point {
    // if (typeof json === "string") {
    //   return JSON.parse(json, Point.reviver)
    // }
    const point = Object.create(Point.prototype);
    // const point = new Point();
    return (<any>Object).assign(point, json);
  }

  invert(): Point {
    return new Point(-this.x, -this.y);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  equal(otherPoint: Point): boolean {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  add(otherPoint: Point): Point {
    return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
  }

  sub(otherPoint: Point): Point {
    return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
  }

  scalar(otherPoint: Point): number {
    return this.x * otherPoint.x + this.y * otherPoint.y;
  }

  cross(otherPoint: Point) {
    return this.x * otherPoint.y - this.y * otherPoint.x;
  }

  rotatedAngle(rotatedPoint: Point): number {
    return rotatedPoint.angle() - this.angle();
  }

  abs(): Point {
    return new Point(Math.abs(this.x), Math.abs(this.y));
  }

  snap(stepX: number, stepY: number): Point {
    return new Point(snap(this.x, stepX), snap(this.y, stepY));
  }

  rotate(angle: number): Point {
    const mat = Matrix2d.rotate(angle);
    return mat.transformPoint(this);
  }

  scale(sx: number, sy: number): Point {
    const mat = Matrix2d.scale(sx, sy);
    return mat.transformPoint(this);
  }

  relativeDirection(pt: Point): RelativeDirection {
    if (pt.equal(this)) {
      return RelativeDirection.None;
    }

    const d = pt.sub(this);
    if (Math.abs(d.x) >= Math.abs(d.y)) {
      if (d.x > 0) {
        return RelativeDirection.Right;
      } else {
        return RelativeDirection.Left;
      }
    }
    // if (Math.abs(d.y) >= Math.abs(d.x)) {
    else {
      if (d.y > 0) {
        return RelativeDirection.Up;
      } else {
        return RelativeDirection.Down;
      }
    }
    return RelativeDirection.None;
  }
}
