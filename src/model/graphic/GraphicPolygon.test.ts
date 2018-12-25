import Point from "../../common/point";
import GraphicPolygon from "./GraphicPolygon";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

describe("GraphicPolygon", () => {
  let polygon: GraphicPolygon;
  let json: any;
  let dto: DtoPlacement;

  beforeEach(() => {
    polygon = new GraphicPolygon();
    polygon.points = [
      new Point(4, 5),
      new Point(7, 8),
      new Point(2, 3),
    ];
    json = {
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

  it("toDTO", () => {
    const gotDto = polygon.toDTO();
    expect(gotDto).toEqual(dto);
  });

  it("fromDTO", () => {
    const gotPolygon = PlacementFactory.fromDTO(
      dto,
    ) as GraphicPolygon;
    expect(gotPolygon instanceof GraphicPolygon).toBeTruthy();
    expect(gotPolygon.type).toEqual(polygon.type);
    expect(gotPolygon).toEqual(polygon);
  });

  it("toJSON and fromJSON with content", () => {
    const myJson = polygon.toJSON();
    expect(myJson).toHaveProperty("points");

    const str: string = JSON.stringify(json);
    const backJson = JSON.parse(str);

    const myPolygon = GraphicPolygon.fromJSON(backJson);
    expect(myPolygon.points).toEqual(polygon.points);
  });

  it("translate polygon", () => {
    const delta = new Point(10, 20);
    const newPolygon = polygon.translate(delta);

    const expectedPoints = polygon.points.map(p => p.add(delta));
    expect(newPolygon.points).toEqual(expectedPoints);
    expect(newPolygon instanceof GraphicPolygon).toBe(true);
  });
});
