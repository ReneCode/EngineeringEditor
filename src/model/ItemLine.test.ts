import ItemLine from "./ItemLine";
import Point from "../common/point";

describe("ItemLine", () => {
  it("create json from ItemLine", () => {
    const p1 = new Point(4, 5);
    const p2 = new Point(7, 8);
    const line = new ItemLine("abc", p1, p2);
    const json = line.toJSON();
    expect(json).toEqual({
      type: "line",
      pageId: "abc",
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
    });
  });

  it("create Line from json", () => {
    const json = {
      type: "line",
      pageId: "abc",
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
    };
    const line = ItemLine.fromJSON(json);
    expect(line).toEqual(
      new ItemLine("abc", new Point(4, 5), new Point(7, 8)),
    );
    expect(line instanceof ItemLine).toBe(true);
  });
});
