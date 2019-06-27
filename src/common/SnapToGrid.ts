import Paper from "paper";
import { Point } from "paper";

let GRID_RASTER = 10;

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

const snapEvent = (event: Paper.MouseEvent): Paper.Point => {
  if (event.modifiers.command) {
    return event.point;
  } else {
    return new Point(
      Math.round(event.point.x / GRID_RASTER) * GRID_RASTER,
      Math.round(event.point.y / GRID_RASTER) * GRID_RASTER,
    );
  }
};

export { snapEvent };
export default SnapToGrid;
