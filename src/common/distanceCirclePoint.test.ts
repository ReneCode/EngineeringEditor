import Point from "./point";
import Arc from "./arc";
import distanceCirclePoint from "./distanceCirclePoint";

describe("distance circle point", () => {
  it("point outside circle", () => {
    const arc = new Arc(new Point(10, 10), 5);
    const pt = new Point(10, 2);
    let distance = distanceCirclePoint(arc, pt);
    expect(distance).toBe(3);
  });

  it("point inside circle", () => {
    const arc = new Arc(new Point(10, 10), 5);
    const pt = new Point(10, 6);
    let distance = distanceCirclePoint(arc, pt);
    expect(distance).toBe(1);
  });

  it("point on circle", () => {
    const arc = new Arc(new Point(10, 10), 5);
    const pt = new Point(10, 5);
    let distance = distanceCirclePoint(arc, pt);
    expect(distance).toBe(0);
  });
});
