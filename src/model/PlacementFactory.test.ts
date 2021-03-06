import { Point } from "paper";
import GraphicLine from "./graphic/GraphicLine";
import PlacementFactory from "./PlacementFactory";
import { DtoPlacement } from "./dtoUtil";
import GraphicSymbol from "./graphic/GraphicSymbol";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import Placement from "./Placement";

describe("PlacementFactory", () => {
  it("GraphicLine", () => {
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
    line.id = "id";
    line.pageId = "pageId";
    line.projectId = "projectId";
    line.color = "red";

    const dto = <DtoPlacement>PlacementFactory.toDTO(line);
    expect(dto.type).toEqual(line.type);
    expect(dto.id).toEqual(line.id);
    expect(dto.pageId).toEqual(line.pageId);
    expect(dto.projectId).toEqual(line.projectId);

    const newLine = PlacementFactory.fromDTO(dto);
    expect(newLine).toBeInstanceOf(GraphicLine);
  });

  it("GraphicLine array", () => {
    const lineA = new GraphicLine(new Point(1, 2), new Point(4, 5));
    const lineB = new GraphicLine(
      new Point(10, 20),
      new Point(40, 50),
    );
    const lines = [lineA, lineB];
    const dto = <DtoPlacement[]>PlacementFactory.toDTO(lines);
    expect(dto).toHaveLength(2);

    const newLines = <Placement[]>PlacementFactory.fromDTO(dto);
    expect(newLines[0]).toBeInstanceOf(GraphicLine);
    expect(newLines[1]).toBeInstanceOf(GraphicLine);
  });

  it("GraphiclSymbolRef", () => {
    const symbolName = "symbol-Name";
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
    const symbol = new GraphicSymbol([line]);

    const symbolRef = new GraphicSymbolRef(
      symbolName,
      new Point(3, 4),
    );
    symbolRef.setSymbol(symbol);
    symbolRef.id = "id";
    symbolRef.pageId = "pageId";
    symbolRef.projectId = "projectId";

    const dto = <DtoPlacement>PlacementFactory.toDTO(symbolRef);
    expect(dto.type).toEqual(symbolRef.type);
    expect(dto.id).toEqual(symbolRef.id);
    expect(dto.pageId).toEqual(symbolRef.pageId);
    expect(dto.projectId).toEqual(symbolRef.projectId);

    const newSymbolRef = <GraphicSymbolRef>(
      PlacementFactory.fromDTO(dto)
    );
    expect(newSymbolRef).toBeInstanceOf(GraphicSymbolRef);
    expect(newSymbolRef.getSymbol()).toBeFalsy();
    expect(newSymbolRef.name).toEqual(symbolRef.name);
    expect(newSymbolRef.id).toEqual(symbolRef.id);
    expect(newSymbolRef.pageId).toEqual(symbolRef.pageId);
    expect(newSymbolRef.projectId).toEqual(symbolRef.projectId);
  });
});
