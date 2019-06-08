import { Point } from "paper";
import GraphicPolygon from "./GraphicPolygon";
import PlacementFactory from "../PlacementFactory";

describe("GraphicPolygon", () => {
  it("toDTO & fromDTO", () => {
    const polygon = new GraphicPolygon();
    polygon.points = [
      new Point(4, 5),
      new Point(7, 8),
      new Point(2, 3),
    ];
    const dto = PlacementFactory.toDTO(polygon);
    const gotPolygon = PlacementFactory.fromDTO(
      dto,
    ) as GraphicPolygon;
    expect(gotPolygon instanceof GraphicPolygon).toBeTruthy();
    expect(gotPolygon.type).toEqual(polygon.type);
    expect(gotPolygon.points).toEqual(polygon.points);
  });
});
