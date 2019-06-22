import { Point } from "paper";
import SnapToGrid from "./SnapToGrid";

describe("SnapToGrid 5er grid", () => {
  const snapToGrid = new SnapToGrid(5);

  // before("", () => {
  //   snapToGrid.setGrid(5);
  // });

  it("snap 7,8 => 5,10", () => {
    expect(snapToGrid.snap(new Point(7, 8))).toEqual(
      new Point(5, 10),
    );
  });

  it("snap 12,13 => 10,15", () => {
    expect(snapToGrid.snap(new Point(12, 13))).toEqual(
      new Point(10, 15),
    );
  });

  it("10er grid: delta 3,0 -> 12,0 -> 14,0 -> 21,0 => 10,0 -> 0,0 -> 10,0", () => {
    snapToGrid.setGrid(10);
    snapToGrid.startDelta(new Point(3, 0));
    const pt1 = snapToGrid.snapDelta(new Point(12, 0));
    expect(pt1).toEqual(new Point(10, 0));

    const pt2 = snapToGrid.snapDelta(new Point(14, 0));
    expect(pt2).toEqual(new Point(0, 0));

    const pt3 = snapToGrid.snapDelta(new Point(21, 0));
    expect(pt3).toEqual(new Point(10, 0));
  });
});
