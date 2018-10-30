import Point from "./point";

describe("Point", () => {
  it("should construct Point()", () => {
    const pt = new Point(4, 6);
    expect(pt.x).toBe(4);
    expect(pt.y).toBe(6);
    expect(pt instanceof Point).toBeTruthy();
  });

  it("should add Point()", () => {
    const p1 = new Point(4, 6);
    const p2 = new Point(2, 3);
    const pt = p1.add(p2);
    expect(pt.x).toBe(4 + 2);
    expect(pt.y).toBe(6 + 3);
  });

  it("should rotate 90 deg", () => {
    const p1 = new Point(10, 2);
    const pt = p1.rotate(Math.PI / 2);
    expect(pt.x).toBeCloseTo(-2, 0.00001);
    expect(pt.y).toBeCloseTo(10, 0.00001);
  });

  it("should rotate -90 deg", () => {
    const p1 = new Point(10, 2);
    const pt = p1.rotate(-Math.PI / 2);
    expect(pt.x).toBeCloseTo(2, 0.00001);
    expect(pt.y).toBeCloseTo(-10, 0.00001);
  });

  it("should scale point", () => {
    const p1 = new Point(10, 2);
    const pt = p1.scale(6, 7);
    expect(pt.x).toBeCloseTo(60, 0.00001);
    expect(pt.y).toBeCloseTo(14, 0.00001);
  });

  it("should calc cross product. left orientation > 0", () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 3);
    expect(p1.cross(p2)).toBeGreaterThan(0);
  });

  it("should calc cross product. right orientation < 0", () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 1.5);
    expect(p1.cross(p2)).toBeLessThan(0);
  });

  it("should calc rotatedAngle +90", () => {
    const p1 = new Point(1, 1);
    const p2 = p1.rotate(Math.PI / 2);
    const angle = p1.rotatedAngle(p2);
    expect(angle).toBeCloseTo(Math.PI / 2, 0.001);
  });

  it("should calc rotatedAngle -90", () => {
    const p1 = new Point(1, 1);
    const p2 = p1.rotate(-Math.PI / 2);
    const angle = p1.rotatedAngle(p2);
    expect(angle).toBeCloseTo(-Math.PI / 2, 0.001);
  });

  describe("equal", () => {
    it("should be equal", () => {
      const p1 = new Point(1, 2, 3);
      const p2 = new Point(1, 2, 4);
      expect(p1.equal(p2)).toBeTruthy();
    });
    it("should be not equal", () => {
      const p1 = new Point(1, 2, 3);
      const p2 = new Point(1, 3, 4);
      expect(p1.equal(p2)).toBeFalsy();
    });
  });

  it("should calc scalar()", () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(2, 3);
    expect(p1.scalar(p2)).toBe(8);
  });

  it("should calc abs()", () => {
    const p1 = new Point(-4, -2);
    const p2 = new Point(4, 2);
    expect(p1.abs()).toEqual(p2);
  });
});
