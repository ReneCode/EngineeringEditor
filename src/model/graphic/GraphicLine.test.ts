import Point from "../../common/point";
import GraphicLine from "./GraphicLine";

describe("GraphicLine", () => {
  let line: GraphicLine;
  let json: any;

  beforeEach(() => {
    const p1 = new Point(4, 5);
    const p2 = new Point(7, 8);
    line = new GraphicLine(p1, p2);

    json = {
      type: "line",
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
    };
  });

  it("toJSON and fromJSON with content", () => {
    const item: GraphicLine = new GraphicLine(
      new Point(-20, 120),
      new Point(180, 120),
    );

    const json = item.toJSON();
    expect(json).toHaveProperty("p1");

    const str: string = JSON.stringify(json);
    const backJson = JSON.parse(str);

    const newLine = GraphicLine.fromJSON(backJson);
    expect(newLine.p1).toEqual(item.p1);
    expect(newLine.p2).toEqual(item.p2);
  });

  it("create json from GraphicLine", () => {
    const gotJson = line.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create Line from json", () => {
    const newLine = GraphicLine.fromJSON(json);
    expect(newLine).toEqual(line);
    expect(newLine instanceof GraphicLine).toBe(true);
  });

  it("translate Line", () => {
    const newLine = line.translate(new Point(10, -10));
    expect(line.p1).toEqual(new Point(4, 5));
    expect(newLine.p1).toEqual(new Point(14, -5));
    expect(newLine.p2).toEqual(new Point(17, -2));
    expect(newLine instanceof GraphicLine).toBe(true);
  });
});
