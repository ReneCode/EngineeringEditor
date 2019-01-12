import GraphicLine from "./graphic/GraphicLine";
import Point from "../common/point";

describe("ObjectFactory", () => {
  it("GraphicLine toJson / fromJson", () => {
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
  });
});
