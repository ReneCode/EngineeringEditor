import ItemLine from "./ItemLine";
import Point from "../common/point";
import Line from "../common/line";

describe("ItemLine", () => {
  let line: ItemLine;
  let json: any;

  beforeEach(() => {
    const p1 = new Point(4, 5);
    const p2 = new Point(7, 8);
    line = new ItemLine("abc", p1, p2);
    line.id = "42";

    json = {
      id: "42",
      type: "line",
      projectId: "",
      pageId: "abc",
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
    };
  });

  it.only("toJSON and fromJSON with content", () => {
    const item: ItemLine = new ItemLine(
      "7",
      new Point(-20, 120),
      new Point(180, 120),
    );
    item.id = "42";
    item.projectId = "projectId";

    const json = item.toJSON(true);
    expect(json).toHaveProperty("content");
    expect(json).not.toHaveProperty("p1");

    const str: string = JSON.stringify(json);
    const backJson = JSON.parse(str);

    const line = ItemLine.fromJSON(backJson);
    expect(line.p1).toEqual(item.p1);
    expect(line).not.toHaveProperty("content");
  });

  // it("json without pageId and id", () => {
  //   const l1 = new ItemLine("", line.p1, line.p2);
  //   const gotJson = l1.toJSON();
  //   expect(gotJson).toEqual({
  //     type: "line",
  //     p1: { x: 4, y: 5 },
  //     p2: { x: 7, y: 8 },
  //   });
  // });

  it("create json from ItemLine", () => {
    const gotJson = line.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create Line from json", () => {
    const newLine = ItemLine.fromJSON(json);
    expect(newLine).toEqual(line);
    expect(newLine instanceof ItemLine).toBe(true);
  });

  it("translate Line", () => {
    const newLine = line.translate(new Point(10, -10));
    expect(line.p1).toEqual(new Point(4, 5));
    expect(newLine.p1).toEqual(new Point(14, -5));
    expect(newLine.p2).toEqual(new Point(17, -2));
    expect(newLine.id).toEqual(line.id);
    expect(newLine instanceof ItemLine).toBe(true);
  });
});
