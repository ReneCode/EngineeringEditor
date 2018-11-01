import Point from "./point";
import Line from "./line";
import distanceLinePoint from "./distanceLinePoint";

describe("distance line point", () => {
  it("should calc distance & lamda 0..1", () => {
    const line = new Line(new Point(5, 3), new Point(10, 3));
    const pt = new Point(7, 9);
    let result = distanceLinePoint(line, pt);
    expect(result.distance).toBe(6);
    expect(result.lamda).toBeLessThan(1);
    expect(result.lamda).toBeGreaterThan(0);
  });

  it("should result lamda > 1", () => {
    const line = new Line(new Point(5, 3), new Point(10, 3));
    const pt = new Point(17, 9);
    let result = distanceLinePoint(line, pt);
    expect(result.lamda).toBeGreaterThan(1);
  });

  it("should result lamda < 0", () => {
    const line = new Line(new Point(5, 3), new Point(10, 3));
    const pt = new Point(0, 9);
    let result = distanceLinePoint(line, pt);
    expect(result.lamda).toBeLessThan(0);
  });
});
