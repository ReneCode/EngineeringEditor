import Page from "../model/Page";
import deepClone from "./deepClone";
import Placement from "../model/Placement";
import GraphicLine from "../model/graphic/GraphicLine";
import Point from "./point";

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
    const line = new GraphicLine(new Point(2, 3), new Point(4, 5));
    expect(line).toBeInstanceOf(GraphicLine);
    const cloneLine = deepClone(line);
    expect(cloneLine.p1).toEqual(new Point(2, 3));
    line.p1 = new Point(10, 20);
    expect(line.p1).toEqual(new Point(10, 20));
    expect(cloneLine.p1).toEqual(new Point(2, 3));
  });
});
