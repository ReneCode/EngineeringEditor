import Point from "../../common/point";
import GraphicLine from "./GraphicLine";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

describe("GraphicLine", () => {
  let line: GraphicLine;
  let dto: DtoPlacement;

  beforeEach(() => {
    const p1 = new Point(4, 5);
    const p2 = new Point(7, 8);
    line = new GraphicLine(p1, p2);
    line.projectId = "projectId";
    line.pageId = "pageId";
    line.id = "id";
    line.color = "red";

    const json = {
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
      color: "red",
    };

    dto = {
      id: line.id,
      projectId: line.projectId,
      pageId: line.pageId,
      type: "line",
      content: JSON.stringify(json),
    };
  });

  it("toDto & fromDto", () => {
    const gotDto = PlacementFactory.toDTO(line);
    expect(gotDto).toEqual(dto);
    const gotLine = PlacementFactory.fromDTO(gotDto);
    expect(gotLine instanceof GraphicLine).toBeTruthy();
    expect(gotLine).toEqual(line);
  });

  it("fromDTO with array of lines => array of placements", () => {
    const twoDto = [dto, dto];
    const gotLines = PlacementFactory.fromDTO(twoDto);
    expect(gotLines).toHaveLength(2);
  });

  it("translate Line", () => {
    const newLine = line.translate(new Point(10, -10));
    expect(line.p1).toEqual(new Point(4, 5));
    expect(newLine.p1).toEqual(new Point(14, -5));
    expect(newLine.p2).toEqual(new Point(17, -2));
    expect(newLine instanceof GraphicLine).toBe(true);
  });
});
