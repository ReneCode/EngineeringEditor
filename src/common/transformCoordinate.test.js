import TransformCoordinate from "./transformCoordinate";

describe("transformCoordinate", () => {
  it("adapt viewport -  stretch viewport X", () => {
    const viewport = {
      x: 100,
      y: 200,
      width: 10,
      height: 30,
    };
    const canvas = {
      width: 400,
      height: 300,
    };
    const tc = new TransformCoordinate(viewport, canvas);
    expect(tc.viewport.height).toBe(30);
    expect(tc.viewport.width).toBe(40);
    expect(tc.viewport.x).toBe(85);
    expect(tc.viewport.y).toBe(200);
  });

  it("adapt viewport -  stretch viewport Y", () => {
    const viewport = {
      x: 100,
      y: 200,
      width: 40,
      height: 10,
    };
    const canvas = {
      width: 400,
      height: 300,
    };
    const tc = new TransformCoordinate(viewport, canvas);
    expect(tc.viewport.height).toBe(30);
    expect(tc.viewport.width).toBe(40);
    expect(tc.viewport.x).toBe(100);
    expect(tc.viewport.y).toBe(190);
  });
});
