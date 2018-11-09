import TransformCoordinate from "./transformCoordinate";
import Point from "./point";
import { isContext } from "vm";

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
      expect(tc.scale).toBeCloseTo(10, 0.001);
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
      expect(tc.wcLengthToCanvas(30)).toBeCloseTo(300, 0.001);
    });

    it("canvasLengthToWc", () => {
      expect(tc.canvasLengthToWc(300)).toBeCloseTo(30, 0.001);
    });
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
    expect(tc.scale).toBeCloseTo(10, 0.001);
  });

  describe("work with matrix", () => {
    const viewport = {
      x: 0,
      y: 0,
      width: 2000,
      height: 1000,
    };
    const canvas = {
      width: 200,
      height: 100,
    };
    const tc = new TransformCoordinate(viewport, canvas);
    it("moveWc and save/restore", () => {
      const pt = new Point(1100, 700);
      let newPt = tc.wcToCanvas(pt);
      expect(newPt.x).toBeCloseTo(110, 0.001);
      expect(newPt.y).toBeCloseTo(100 - 70, 0.001);

      tc.save();
      const delta = new Point(100, 50);
      tc.addTranslateWc(delta);
      newPt = tc.wcToCanvas(pt);
      expect(newPt.x).toBeCloseTo(120, 0.001);
      expect(newPt.y).toBeCloseTo(100 - 75, 0.001);

      tc.restore();
      let orgPt = tc.wcToCanvas(pt);
      expect(orgPt.x).toBeCloseTo(110, 0.001);
      expect(orgPt.y).toBeCloseTo(100 - 70, 0.001);
    });
  });
});
