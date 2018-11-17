import GraphicCircle from "./GraphicCircle";
import Point from "../../common/point";
import GraphicFactory from "./GraphicFactory";

describe("GraphicCircle", () => {
  let circle: GraphicCircle;
  let json: any;

  beforeEach(() => {
    const pt = new Point(7, 8);
    circle = new GraphicCircle(pt, 14);
    json = {
      type: "circle",
      pt: { x: 7, y: 8 },
      radius: 14,
    };
  });

  it("create json from GraphicCircle", () => {
    const gotJson = circle.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create GraphicCircle from json", () => {
    const newCircle = GraphicFactory.fromJSON(json);
    expect(newCircle).toEqual(circle);
    expect(newCircle instanceof GraphicCircle).toBe(true);
  });
});
