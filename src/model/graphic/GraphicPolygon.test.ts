import Point from "../../common/point";
import GraphicPolygon from "./GraphicPolygon";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

describe("GraphicPolygon", () => {
  let polygon: GraphicPolygon;
  let dto: DtoPlacement;

  beforeEach(() => {
    polygon = new GraphicPolygon();
    polygon.points = [
      new Point(4, 5),
      new Point(7, 8),
      new Point(2, 3),
    ];
    const json = {
      points: [{ x: 4, y: 5 }, { x: 7, y: 8 }, { x: 2, y: 3 }],
    };
    dto = {
      id: polygon.id,
      projectId: polygon.projectId,
      pageId: polygon.pageId,
      type: "polygon",
      content: JSON.stringify(json),
    };
  });

  it("toDTO & fromDTO", () => {
    const gotDto = PlacementFactory.toDTO(polygon);
    expect(gotDto).toEqual(dto);
    const gotPolygon = PlacementFactory.fromDTO(
      gotDto,
    ) as GraphicPolygon;
    expect(gotPolygon instanceof GraphicPolygon).toBeTruthy();
    expect(gotPolygon.type).toEqual(polygon.type);
    expect(gotPolygon).toEqual(polygon);
  });

  it("translate polygon", () => {
    const delta = new Point(10, 20);
    const newPolygon = polygon.translate(delta);

    const expectedPoints = polygon.points.map(p => p.add(delta));
    expect(newPolygon.points).toEqual(expectedPoints);
    expect(newPolygon instanceof GraphicPolygon).toBe(true);
  });
});
