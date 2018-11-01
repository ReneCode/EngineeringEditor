import Point from "./point";
import distanceCirclePoint from "./distanceCirclePoint";

export default class Arc {
  pt: Point;
  r: number;
  angleStart: number;
  angleEnd: number;

  constructor(
    pt: Point,
    r: number,
    angleStart: number = 0,
    angleEnd: number = Math.PI * 2,
  ) {
    this.pt = pt;
    this.r = r;
    this.angleStart = angleStart;
    this.angleEnd = angleEnd;
  }

  nearPoint(point: Point, radius: number): boolean {
    // works only for circles
    const distance = distanceCirclePoint(this, point);
    return distance <= radius;
  }
}
