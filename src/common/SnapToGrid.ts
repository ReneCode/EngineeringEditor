import Paper from "paper";

class SnapToGrid {
  grid = 10;

  public setGrid(grid: number) {
    this.grid = grid;
  }

  public snap(point: Paper.Point): Paper.Point {
    return new Paper.Point(
      Math.round(point.x / this.grid) * this.grid,
      Math.round(point.y / this.grid) * this.grid,
    );
  }
}
export default SnapToGrid;
