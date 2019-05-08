import Paper from "paper";
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

  it("fitToRect same rect", () => {
    const rectangle = new Paper.Rectangle(2, 3, 5, 5);
    const newPolygon = polygon.fitToRect(rectangle);
    const expectedPoints = polygon.points;
    expect(newPolygon.points).toEqual(expectedPoints);
  });

  it("fitToRect translate", () => {
    const rectangle = new Paper.Rectangle(12, 23, 5, 5);
    const newPolygon = polygon.fitToRect(rectangle);
    const expectedPoints = polygon.points.map(p =>
      p.add(new Point(10, 20)),
    );
    expect(newPolygon.points).toEqual(expectedPoints);
  });

  it("fitToRect scale x:2x y:3x", () => {
    polygon.points = [
      new Point(5, 10),
      new Point(15, 50),
      new Point(10, 20),
    ];
    // bbox = 5,10,  w:10  h:40
    const rectangle = new Paper.Rectangle(5, 10, 20, 120);
    const newPolygon = polygon.fitToRect(rectangle);
    const expectedPoints = [
      new Point(5, 10),
      new Point(25, 130),
      new Point(15, 40),
    ];
    expect(newPolygon.points).toEqual(expectedPoints);
  });

  it("fitToRect scale x:2x y:3x and translate", () => {
    polygon.points = [
      new Point(5, 10),
      new Point(15, 50),
      new Point(10, 20),
    ];
    // bbox = 5,10,  w:10  h:40
    const rectangle = new Paper.Rectangle(105, 110, 20, 120);
    const newPolygon = polygon.fitToRect(rectangle);
    const expectedPoints = [
      new Point(105, 110),
      new Point(125, 230),
      new Point(115, 140),
    ];
    expect(newPolygon.points).toEqual(expectedPoints);
  });
});
