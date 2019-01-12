import GraphicLine from "./graphic/GraphicLine";
import Point from "../common/point";
import GraphicSymbol from "./graphic/GraphicSymbol";
import ElementFactory from "./ElementFactory";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";

describe("ElementFactory", () => {
  it("GraphicSymbol with GraphicLine as items", () => {
    const symbolName = "symbol-Name";
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
    line.id = "id";
    line.pageId = "pageId";
    line.projectId = "projectId";

    const symbol = new GraphicSymbol("projectId", symbolName);
    symbol.id = "id";
    symbol.insertPt = new Point(8, 9);
    symbol.items = [line];

    const dto = ElementFactory.toDTO(symbol);

    expect(dto.type).toEqual(symbol.type);
    expect(dto.id).toEqual(symbol.id);
    expect(dto.projectId).toEqual(symbol.projectId);
    expect(dto.name).toEqual(symbol.name);

    const newSymbol = <GraphicSymbol>ElementFactory.fromDTO(dto);
    expect(newSymbol).toBeInstanceOf(GraphicSymbol);
    expect(newSymbol.items[0]).toBeInstanceOf(GraphicLine);
    const newLine = <GraphicLine>newSymbol.items[0];

    expect(newLine.p1).toEqual(line.p1);
    expect(newLine.id).toBeFalsy();

    // delete the properties that are not needed inside a symbol
    delete line.pageId;
    delete line.projectId;
    delete line.id;

    expect(newSymbol).toEqual(symbol);
  });

  it("GraphicSymbol with GraphicSymbolRef as items", () => {
    const symbolName = "symbol-Name";
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
    line.id = "id";
    line.pageId = "pageId";
    line.projectId = "projectId";
    const symbolItem = new GraphicSymbol("projectId", symbolName);
    symbolItem.items = [line];

    const symbolRef = new GraphicSymbolRef(
      symbolName,
      new Point(3, 4),
      symbolItem,
    );
    symbolRef.id = "id";
    symbolRef.pageId = "pageId";
    symbolRef.projectId = "projectId";

    const symbol = new GraphicSymbol("projectId", symbolName);
    symbol.id = "id";
    symbol.insertPt = new Point(8, 9);
    symbol.items = [symbolRef];

    const dto = ElementFactory.toDTO(symbol);

    expect(dto.type).toEqual(symbol.type);
    expect(dto.id).toEqual(symbol.id);
    expect(dto.projectId).toEqual(symbol.projectId);
    expect(dto.name).toEqual(symbol.name);

    const newSymbol = <GraphicSymbol>ElementFactory.fromDTO(dto);
    expect(newSymbol).toBeInstanceOf(GraphicSymbol);
    expect(newSymbol.items[0]).toBeInstanceOf(GraphicSymbolRef);
    const newSymbolRef = newSymbol.items[0] as GraphicSymbolRef;
    expect(newSymbolRef.name).toEqual(symbolRef.name);
    expect(newSymbolRef.pt).toEqual(symbolRef.pt);
    expect(newSymbolRef.symbol).toBeFalsy();

    // delete properties that are not expected to be set
    delete symbolRef.symbol;
    delete symbolRef.pageId;
    delete symbolRef.projectId;
    delete symbolRef.id;

    expect(newSymbol).toEqual(symbol);
  });
});
