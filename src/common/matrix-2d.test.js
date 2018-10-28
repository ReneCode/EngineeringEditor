import Matrix2d from "./matrix-2d";

describe("Matrix2d", () => {
  it("should construct Matrix()", () => {
    const m = new Matrix2d(1, 2, 3, 4, 5, 6);
    expect(m.a).toBe(1);
    expect(m.b).toBe(2);
    expect(m.c).toBe(3);
    expect(m.d).toBe(4);
    expect(m.e).toBe(5);
    expect(m.f).toBe(6);
    expect(m instanceof Matrix2d).toBeTruthy();
  });

  it("should create identity matrix", () => {
    const m = Matrix2d.identity();
    const expectedMatrix = new Matrix2d(1, 0, 0, 1, 0, 0);
    expect(m).toEqual(expectedMatrix);
  });

  it("should transform point identity", () => {
    const m = Matrix2d.identity();
    const pt = m.transformPoint(4, 5);
    expect(pt.x).toBe(4);
    expect(pt.y).toBe(5);
  });

  it("should create scale matrix", () => {
    const m = Matrix2d.scale(4, 5);
    const expectMatrix = new Matrix2d(4, 0, 0, 5, 0, 0);
    expect(m).toEqual(expectMatrix);
  });

  it("should create translate matrix", () => {
    const m = Matrix2d.translate(4, 5);
    const expectedMatrix = new Matrix2d(1, 0, 0, 1, 4, 5);
    expect(m).toEqual(expectedMatrix);
  });

  it("should translate point", () => {
    const m = Matrix2d.translate(4, 5);
    const pt = m.transformPoint(5, 6);
    expect(pt.x).toBeCloseTo(9, 0.001);
    expect(pt.y).toBeCloseTo(11, 0.001);
  });

  it("should translate twice point", () => {
    const t1 = Matrix2d.translate(4, 5);
    const t2 = Matrix2d.translate(-1, -2);
    const m = t1.multiply(t2);
    const pt = m.transformPoint(5, 6);
    expect(pt.x).toBeCloseTo(8, 0.001);
    expect(pt.y).toBeCloseTo(9, 0.001);
  });

  it("should translate and rotate point", () => {
    const t1 = Matrix2d.translate(4, 5);
    const t2 = Matrix2d.rotate(Math.PI);
    const m = t1.multiply(t2);
    const pt = m.transformPoint(5, 6);
    expect(pt.x).toBeCloseTo(-9, 0.001);
    expect(pt.y).toBeCloseTo(-11, 0.001);
  });
});
