import Paper from "paper";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

describe("paper", () => {
  it("matrix 2x translation", () => {
    const p1 = new Paper.Point(5, 7);
    let matrix = new Paper.Matrix(1, 0, 0, 1, 0, 0);
    matrix = matrix.translate(2, 3);
    matrix = matrix.translate(10, 20);
    const p2 = matrix.transform(p1);
    expect(p2).toEqual(new Paper.Point(17, 30));
  });

  it("matrix scale without center", () => {
    const p1 = new Paper.Point(5, 7);
    let matrix = new Paper.Matrix(1, 0, 0, 1, 0, 0);
    matrix = matrix.scale(2, 3);
    const p2 = matrix.transform(p1);
    expect(p2).toEqual(new Paper.Point(10, 21));
  });

  it("matrix scale with center", () => {
    const p1 = new Paper.Point(5, 15);
    let matrix = new Paper.Matrix(1, 0, 0, 1, 0, 0);
    matrix = matrix.scale(3, 2, new Paper.Point(20, 10));
    const p2 = matrix.transform(p1);
    expect(p2).toEqual(new Paper.Point(-25, 20));
  });

  it("matrix translate & scale with center", () => {
    const p1 = new Paper.Point(1, 14);
    let matrix = new Paper.Matrix(1, 0, 0, 1, 0, 0);
    // 2.scale
    matrix = matrix.scale(3, 2, new Paper.Point(20, 10));
    // 1.translate
    matrix = matrix.translate(4, 1);
    const p2 = matrix.transform(p1);
    expect(p2).toEqual(new Paper.Point(-25, 20));
  });

  it.skip("clone with data", () => {
    const dom = new JSDOM(`<!DOCTYPE html><canvas />`);
    const canvas = dom.window.document.querySelector("canvas");
    Paper.setup(canvas as HTMLCanvasElement);
    const i1 = new Paper.Item();
    i1.data = { nr: 42, str: "hello" };
    const i2 = i1.clone();
    expect(i2.data).toBeFalsy();
    expect(i2.data.nr).toEqual(42);
    expect(i2.data.str).toEqual("hello");
  });
});
