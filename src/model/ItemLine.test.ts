import ItemLine from "./ItemLine";
import Point from "../common/point";

describe("ItemLine", () => {
  let line: ItemLine;
  let json: any;

  beforeEach(() => {
    const p1 = new Point(4, 5);
    const p2 = new Point(7, 8);
    line = new ItemLine("abc", p1, p2);

    json = {
      id: 0,
      type: "line",
      pageId: "abc",
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
    };
  });

  it("create json from ItemLine", () => {
    const gotJson = line.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create Line from json", () => {
    const newLine = ItemLine.fromJSON(json);
    expect(newLine).toEqual(line);
    expect(newLine instanceof ItemLine).toBe(true);
  });
});
