import Paper from "paper";
import GraphicLine from "./GraphicLine";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

describe("GraphicLine", () => {
  let line: GraphicLine;
  let dto: DtoPlacement;

  beforeEach(() => {
    const p1 = new Paper.Point(4, 5);
    const p2 = new Paper.Point(7, 8);
    line = new GraphicLine(p1, p2);
    line.projectId = "projectId";
    line.pageId = "pageId";
    line.id = "id";
    line.color = "red";

    const json = {
      color: "red",
      p1: { x: 4, y: 5 },
      p2: { x: 7, y: 8 },
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
    if (gotLine instanceof GraphicLine) {
      expect(gotLine.p1).toEqual(line.p1);
      expect(gotLine.p2).toEqual(line.p2);
      expect(gotLine.color).toEqual(line.color);
      expect(gotLine.id).toEqual(line.id);
    }
  });

  it("fromDTO with array of lines => array of placements", () => {
    const twoDto = [dto, dto];
    const gotLines = PlacementFactory.fromDTO(twoDto);
    expect(gotLines).toHaveLength(2);
  });

  it("translate Line", () => {
    line.translate(new Paper.Point(10, -10));
    expect(line.p1).toEqual(new Paper.Point(14, -5));
    expect(line.p2).toEqual(new Paper.Point(17, -2));
  });
});
