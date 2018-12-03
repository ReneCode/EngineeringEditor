import Point from "../../common/point";
import GraphicPolygon from "./GraphicPolygon";

describe("GraphicPolygon", () => {
  let polygon: GraphicPolygon;
  let json: any;

  beforeEach(() => {
    polygon = new GraphicPolygon();
    polygon.points = [
      new Point(4, 5),
      new Point(7, 8),
      new Point(2, 3),
    ];
    json = {
      type: "polygon",
      points: [{ x: 4, y: 5 }, { x: 7, y: 8 }, { x: 2, y: 3 }],
    };
  });

  it("toJSON and fromJSON with content", () => {
    const myJson = polygon.toJSON();
    expect(myJson).toHaveProperty("points");

    const str: string = JSON.stringify(json);
    const backJson = JSON.parse(str);

    const myPolygon = GraphicPolygon.fromJSON(backJson);
    expect(myPolygon.type).toEqual(polygon.type);
    expect(myPolygon.points).toEqual(polygon.points);
  });

  it("create json from GraphicLine", () => {
    const gotJson = polygon.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create Line from json", () => {
    const newPolygon = GraphicPolygon.fromJSON(json);
    expect(newPolygon).toEqual(polygon);
    expect(newPolygon instanceof GraphicPolygon).toBe(true);
  });

  it("translate Line", () => {
    const newPolygon = polygon.translate(new Point(10, 20));
    expect(newPolygon.points).toEqual([
      new Point(14, 25),
      new Point(17, 28),
      new Point(12, 23),
    ]);
    expect(newPolygon instanceof GraphicPolygon).toBe(true);
  });
});
