import TransformCoordinate from "./transformCoordinate";
import Point from "./point";

describe("transformCoordinate", () => {
  describe("vieport has to be strechted", () => {
    let tc: TransformCoordinate;
    beforeEach(() => {
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
      tc = new TransformCoordinate(viewport, canvas);
    });

    it("adapt viewport -  stretch viewport X", () => {
      expect(tc.viewport.height).toBe(30);
      expect(tc.viewport.width).toBe(40);
      expect(tc.viewport.x).toBe(85);
      expect(tc.viewport.y).toBe(200);
      expect(tc.scale).toBe(0.1);
    });
    it("wcToCanvas a", () => {
      const pt = new Point(105, 205);
      const newPt = tc.wcToCanvas(pt);
      expect(newPt.x).toBeCloseTo(200, 0.001);
      expect(newPt.y).toBeCloseTo(250, 0.001);
    });
    it("wcToCanvas b", () => {
      const pt = new Point(110, 230);
      const newPt = tc.wcToCanvas(pt);
      expect(newPt.x).toBeCloseTo(250, 0.001);
      expect(newPt.y).toBeCloseTo(0, 0.001);
    });

    it("canvasToWc a", () => {
      const pt = new Point(200, 250);
      expect(tc.canvasToWc(pt)).toEqual(new Point(105, 205));
    });
    it("canvasToWc b", () => {
      const pt = new Point(250, 0);
      expect(tc.canvasToWc(pt)).toEqual(new Point(110, 230));
    });

    it("wcLengthToCanvas", () => {
      expect(tc.wcLengthToCanvas(30)).toBe(300);
    });

    it("canvasLengthToWc", () => {
      expect(tc.canvasLengthToWc(300)).toBe(30);
    });

    it ("addTranslate", () => {
      tc.addTranslate(20, 30);
      const pt = new Point(250, 0);
      expect(tc.canvasToWc(pt)).toEqual(new Point(110+20, 230+30));
    })
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
    expect(tc.scale).toBe(0.1);
  });
});
