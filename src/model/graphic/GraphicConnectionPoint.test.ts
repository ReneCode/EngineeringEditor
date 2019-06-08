import { Point } from "paper";
import GraphicLine from "./GraphicLine";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";
import GraphicConnectionPoint, {
  ConnectionPointDirection,
} from "./GraphicConnectionPoint";

describe("GraphicConnectionPoint", () => {
  it("toDto & fromDto", () => {
    const pt = new Point(4, 5);
    const connectionPoint = new GraphicConnectionPoint(pt);
    connectionPoint.direction = ConnectionPointDirection.UP;
    connectionPoint.projectId = "projectId";
    connectionPoint.pageId = "pageId";
    connectionPoint.id = "id";
    connectionPoint.index = 234;
    expect(connectionPoint.type).toEqual("connectionpoint");
    expect(connectionPoint.pt).toEqual(pt);

    const dto = PlacementFactory.toDTO(
      connectionPoint,
    ) as DtoPlacement;
    expect(dto.pageId).toEqual(connectionPoint.pageId);
    expect(dto.type).toEqual(connectionPoint.type);

    const gotConnectionPoint = PlacementFactory.fromDTO(
      dto,
    ) as GraphicConnectionPoint;
    expect(gotConnectionPoint).toBeInstanceOf(GraphicConnectionPoint);
    expect(gotConnectionPoint.pt).toEqual(connectionPoint.pt);
    expect(gotConnectionPoint.direction).toEqual(
      connectionPoint.direction,
    );
  });
});
