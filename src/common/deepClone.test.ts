import Page from "../model/Page";
import deepClone from "./deepClone";
import GraphicLine from "../model/graphic/GraphicLine";
import Paper from "paper";

describe("deepClone", () => {
  it("clone page", () => {
    const page = new Page("name-a");
    expect(page).toBeInstanceOf(Page);
    const clonePage = deepClone(page);
    expect(clonePage).toHaveProperty("name", "name-a");
    page.name = "orginal";
    expect(page).toHaveProperty("name", "orginal");
    expect(clonePage).toHaveProperty("name", "name-a");
    expect(clonePage).toBeInstanceOf(Page);
  });

  it("clone GraphicLine", () => {
    const line = new GraphicLine(
      new Paper.Point(2, 3),
      new Paper.Point(4, 5),
    );
    expect(line).toBeInstanceOf(GraphicLine);
    const cloneLine = deepClone(line);
    expect(cloneLine.p1).toEqual(new Paper.Point(2, 3));
    line.p1 = new Paper.Point(10, 20);
    expect(line.p1).toEqual(new Paper.Point(10, 20));
    expect(cloneLine.p1).toEqual(new Paper.Point(2, 3));
  });

  it("to not clone attributes starting with '_'", () => {
    const obj = { a: 3, b: { x: 32, _y: 42 }, _c: "hallo" };
    const copyObj = deepClone(obj);
    expect(copyObj).toEqual({
      a: 3,
      b: { x: 32 },
    });
  });

  it("clone Paper.Point", () => {
    const p1 = new Paper.Point(4, 5);
    const p2 = deepClone(p1);
    expect(p2).toEqual(p1);
    expect(p2).toBeInstanceOf(Paper.Point);
  });
});
