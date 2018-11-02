import Matrix2d from "./matrix-2d";
import { snap } from "./snap";

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
    const pt = mat.transformPoint(this.x, this.y);
    return new Point(pt.x, pt.y);
  }

  scale(sx: number, sy: number): Point {
    const mat = Matrix2d.scale(sx, sy);
    const pt = mat.transformPoint(this.x, this.y);
    return new Point(pt.x, pt.y);
  }
}