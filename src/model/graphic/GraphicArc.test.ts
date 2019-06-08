import Paper from "paper";
import GraphicArc from "./GraphicArc";

describe("GraphicArc", () => {
  it("toJSON / fromJSON", () => {
    const arc = new GraphicArc(new Paper.Point(4, 5), 10);
    arc.layer = "grip";
    const json = arc.toJSON();
    expect(json.center).toEqual({ x: 4, y: 5 });
    expect(json.radius).toEqual(10);
    expect(json.layer).toEqual("grip");

    const content = JSON.stringify(json);

    const newJson = JSON.parse(content);
    const newArc = GraphicArc.fromJSON(newJson);
    expect(newArc.radius).toEqual(10);
    expect(newArc.center).toEqual({ x: 4, y: 5 });
  });
});
