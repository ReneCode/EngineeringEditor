import Point from "./point";
import Matrix2d from "./matrix-2d";
import { number } from "prop-types";

interface IViewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ICanvas {
  width: number;
  height: number;
}

class TransformCoordinate {
  matrixStack: Matrix2d[] = [];
  currentMatrix: Matrix2d = Matrix2d.identity();
  inverseMatrix: Matrix2d= Matrix2d.identity();
  viewport: IViewport = { x: 0, y: 0, width: 100, height: 100 };
  canvas: ICanvas = { width: 100, height: 100 };
  scale: number = 1;    // from canvas to viewport

  constructor(viewport: IViewport, canvas: ICanvas) {
    this.matrixStack = [];
    this.currentMatrix = Matrix2d.identity();

    if (!viewport) {
      throw new Error("viewport missing");
    }

    if (!canvas) {
      throw new Error("canvas missing");
    }

    //  adapt viewport to get vieport and canvas fit together
    const ratioX = viewport.width/canvas.width;
    const ratioY = viewport.height / canvas.height;
    this.viewport = { ...viewport };
    this.canvas = { ...canvas };
    if (ratioX < ratioY) {
      // keep height of viewport / keep ratioY
      // strech x to both sides
      this.scale = ratioY;
      const oldVpWidth = this.viewport.width;
      this.viewport.width = this.canvas.width * this.scale;
      this.viewport.x -= (this.viewport.width - oldVpWidth) / 2;
    } else {
      // keep width of viewport
      // stretch height and center it
      this.scale = ratioX;
      const oldVpHeight = this.viewport.height;
      this.viewport.height = this.canvas.height * this.scale;
      this.viewport.y -= (this.viewport.height - oldVpHeight) / 2;
    }

    this.currentMatrix = Matrix2d.identity()
      .multiply(Matrix2d.scale(1, -1))
      .multiply(Matrix2d.translate(0, this.canvas.height))
      .multiply(Matrix2d.scale(this.scale, this.scale))
      .multiply(Matrix2d.translate(this.viewport.x, this.viewport.y));

    this.inverseMatrix= this.currentMatrix.inverse();
  }

  wcToCanvas(pt: Point): Point {
    // const x = (pt.x - this.viewport.x) * this.scale;
    // const y =
    //   this.canvas.height - (pt.y - this.viewport.y) * this.scale;
    // return new Point(x, y);
    return this.inverseMatrix.transformPoint(pt);
  }

  wcLengthToCanvas(len: number): number {
    return len / this.scale;
  }

  canvasLengthToWc(len: number): number {
    return len * this.scale;
  }

  canvasToWc(pt: Point): Point {
    // const x = pt.x / this.scale + this.viewport.x;
    // const y =
    //   (this.canvas.height - pt.y) / this.scale + this.viewport.y;
    // return new Point(x, y);
    return this.currentMatrix.transformPoint(pt);
  }

  toWc(pt: Point): Point {
    return this.currentMatrix.transformPoint(pt);
  }
}

export default TransformCoordinate;
