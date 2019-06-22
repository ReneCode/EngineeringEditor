import { Point } from "paper";

class SnapToGrid {
  private startPoint: Point | null = null;

  constructor(private grid: number = 10) {}

  public setGrid(grid: number) {
    this.grid = grid;
  }

  public snap(point: Point): Point {
    return new Point(
      Math.round(point.x / this.grid) * this.grid,
      Math.round(point.y / this.grid) * this.grid,
    );
  }

  public startDelta(point: Point) {
    this.startPoint = point;
  }

  public snapDelta(pt: Point): Point {
    if (!this.startPoint) {
      return new Point(0, 0);
    }
    const delta = pt.subtract(this.startPoint);
    const snapDelta = this.snap(delta);
    this.startPoint = this.startPoint.add(snapDelta);
    return snapDelta;
  }
}
export default SnapToGrid;
