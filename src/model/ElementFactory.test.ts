import { Point } from "paper";
import GraphicLine from "./graphic/GraphicLine";
import GraphicSymbol from "./graphic/GraphicSymbol";
import ElementFactory from "./ElementFactory";

describe("ElementFactory", () => {
  it("GraphicSymbol with GraphicLine as items", () => {
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
    line.id = "id";
    line.pageId = "pageId";
    line.projectId = "projectId";

    const symbol = new GraphicSymbol([line]);
    symbol.name = "test-symbol";
    symbol.insertPt = new Point(8, 9);

    const dto = ElementFactory.toDTO(symbol);

    expect(dto.type).toEqual(symbol.type);
    expect(dto.id).toEqual(symbol.id);
    expect(dto.projectId).toEqual(symbol.projectId);
    expect(dto.name).toEqual(symbol.name);

    const newSymbol = <GraphicSymbol>ElementFactory.fromDTO(dto);
    expect(newSymbol).toBeInstanceOf(GraphicSymbol);
    expect(newSymbol.name).toEqual(symbol.name);
    expect(newSymbol.insertPt).toEqual(symbol.insertPt);
    expect(newSymbol._item).toBeNull;

    expect(newSymbol.placements).toHaveLength(1);
    expect(newSymbol.placements[0]).toBeInstanceOf(GraphicLine);
    const newLine = newSymbol.placements[0] as GraphicLine;

    expect(newLine.p1).toEqual(line.p1);
    expect(newLine.id).toEqual(line.id);
  });
});
