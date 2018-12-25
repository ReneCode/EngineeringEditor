import GraphicCircle from "./GraphicCircle";
import Point from "../../common/point";
import GraphicFactory from "./GraphicFactory";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

describe("GraphicCircle", () => {
  let circle: GraphicCircle;
  let json: any;
  let dto: DtoPlacement;

  beforeEach(() => {
    const pt = new Point(7, 8);
    circle = new GraphicCircle(pt, 14);
    circle.projectId = "projectId";
    circle.pageId = "pageId";
    circle.id = "id";

    json = {
      pt: { x: 7, y: 8 },
      radius: 14,
    };

    dto = {
      id: circle.id,
      projectId: circle.projectId,
      pageId: circle.pageId,
      type: "circle",
      content: JSON.stringify(json),
    };
  });

  it("toDTO", () => {
    const gotDto = circle.toDTO();
    expect(gotDto).toEqual(dto);
  });

  it("fromDTO", () => {
    const gotCircle = PlacementFactory.fromDTO(dto);
    expect(gotCircle instanceof GraphicCircle).toBeTruthy();
    expect(gotCircle).toEqual(circle);
  });

  it("create json from GraphicCircle", () => {
    const gotJson = circle.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("translate Circle", () => {
    const delta = new Point(10, 20);
    const newCircle = circle.translate(delta);
    expect(newCircle instanceof GraphicCircle).toBe(true);
    expect(newCircle.pt).toEqual(circle.pt.add(delta));
  });
});
