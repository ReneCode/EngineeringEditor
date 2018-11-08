import Point from "./point";

/*
  a c e
  b d f
  0 0 1
*/

export default class Matrix2d {
  a: number = 1;
  b: number = 0;
  c: number = 0;
  d: number = 1;
  e: number = 0;
  f: number = 0;
  constructor(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  // set();

  static identity(): Matrix2d {
    return new Matrix2d(1, 0, 0, 1, 0, 0);
  }

  static translate(tx: number, ty: number): Matrix2d {
    return new Matrix2d(1, 0, 0, 1, tx, ty);
  }

  static scale(sx: number, sy: number) {
    return new Matrix2d(sx, 0, 0, sy, 0, 0);
  }

  static rotate(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix2d(cos, sin, -sin, cos, 0, 0);
  }

  // result = this * other
  multiply(other: Matrix2d) {
    return new Matrix2d(
      other.a * this.a + other.c * this.b,
      other.b * this.a + other.d * this.b,
      other.a * this.c + other.c * this.d,
      other.b * this.c + other.d * this.d,
      other.a * this.e + other.c * this.f + other.e,
      other.b * this.e + other.d * this.f + other.f,
    );
  }

  transformPoint(pt: Point) {
    const { x, y } = this.transform(pt.x, pt.y);
    return new Point(x, y);
  }

  transform(x: number, y: number) {
    return {
      x: x * this.a + y * this.c + this.e,
      y: x * this.b + y * this.d + this.f,
    };
  }
}
