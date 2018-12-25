//
import Point from "../../common/point";
import GraphicLine from "./GraphicLine";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "./GraphicConnectionPoint";

describe("GraphicConnectionPoint", () => {
  let connectionPoint: GraphicConnectionPoint;
  let dto: any;

  beforeEach(() => {
    const pt = new Point(4, 5);
    connectionPoint = new GraphicConnectionPoint(pt);
    connectionPoint.direction = ConnectionPointDirection.UP;
    connectionPoint.projectId = "projectId";
    connectionPoint.pageId = "pageId";
    connectionPoint.id = "id";

    const content = {
      direction: connectionPoint.direction,
      pt: { x: 4, y: 5 },
    };

    dto = {
      id: connectionPoint.id,
      projectId: connectionPoint.projectId,
      pageId: connectionPoint.pageId,
      type: "connectionpoint",
      content: JSON.stringify(content),
    };
  });

  it("toDto & fromDto", () => {
    const gotDto = PlacementFactory.toDTO(connectionPoint);
    expect(gotDto).toEqual(dto);
    const gotConnectionPoint = PlacementFactory.fromDTO(gotDto);
    expect(
      gotConnectionPoint instanceof GraphicConnectionPoint,
    ).toBeTruthy();
    expect(gotConnectionPoint).toEqual(connectionPoint);
  });

  it("translate ConnectionPoint", () => {
    const delta = new Point(50, 40);
    const newConnectionPoint = connectionPoint.translate(delta);
    expect(newConnectionPoint.pt).toEqual(
      connectionPoint.pt.add(delta),
    );
    expect(newConnectionPoint instanceof GraphicConnectionPoint).toBe(
      true,
    );
  });
});
