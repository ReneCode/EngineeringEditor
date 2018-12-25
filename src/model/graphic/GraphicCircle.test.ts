import GraphicCircle from "./GraphicCircle";
import Point from "../../common/point";
import GraphicFactory from "./GraphicFactory";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

describe("GraphicCircle", () => {
  let circle: GraphicCircle;
  let dto: DtoPlacement;

  beforeEach(() => {
    const pt = new Point(7, 8);
    circle = new GraphicCircle(pt, 14);
    circle.projectId = "projectId";
    circle.pageId = "pageId";
    circle.id = "id";
    circle.color = "brown";

    const json = {
      pt: { x: 7, y: 8 },
      radius: 14,
      color: "brown",
    };

    dto = {
      id: circle.id,
      projectId: circle.projectId,
      pageId: circle.pageId,
      type: "circle",
      content: JSON.stringify(json),
    };
  });

  it("toDto & fromDto", () => {
    const gotDto = PlacementFactory.toDTO(circle);
    expect(gotDto).toEqual(dto);
    const gotCircle = PlacementFactory.fromDTO(gotDto);
    expect(gotCircle instanceof GraphicCircle).toBeTruthy();
    expect(gotCircle).toEqual(circle);
  });

  it("translate Circle", () => {
    const delta = new Point(10, 20);
    const newCircle = circle.translate(delta);
    expect(newCircle instanceof GraphicCircle).toBe(true);
    expect(newCircle.pt).toEqual(circle.pt.add(delta));
  });
});
