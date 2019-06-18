import { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import GraphicLine from "./GraphicLine";
import { DtoElement } from "../dtoUtil";
import GraphicArc from "./GraphicArc";

describe("GraphicSymbol", () => {
  let symbol: GraphicSymbol;
  let dto: DtoElement;

  it.only("toJSON / fromJSON", () => {
    const line = new GraphicLine(new Point(5, 6), new Point(3, 20));
    const arc = new GraphicArc(new Point(10, 10), 40);
    const symbolA = new GraphicSymbol([line, arc]);
    symbolA.name = "testSymbol";

    expect(symbolA.placements).toHaveLength(2);

    const json = symbolA.toJSON();
    expect(json.type).toEqual("symbol");
    expect(json.placements).toHaveLength(2);

    const symbolB = GraphicSymbol.fromJSON(json);
    expect(symbolB).toBeInstanceOf(GraphicSymbol);
    expect(symbolB.name).toEqual(symbolA.name);
    expect(symbolB.placements).toHaveLength(2);
    expect(symbolB.placements[0]).toBeInstanceOf(GraphicLine);
    expect(symbolB.placements[1]).toBeInstanceOf(GraphicArc);
  });

  /*
  beforeEach(() => {
    const projectId = "prjId";
    const symbolName = "mySymbol";
    symbol = new GraphicSymbol(projectId, symbolName);
    symbol.id = "4321";
    symbol.insertPt = new Point(10, 10);
    const itemLine = new GraphicLine(
      new Point(2, 3),
      new Point(4, 5),
    );
    itemLine.id = "id-line";
    itemLine.color = "blue";
    const itemCircle = new GraphicCircle(new Point(10, 20), 15);
    itemCircle.id = "id-circle";
    itemCircle.color = "red";
    symbol.items = [itemLine, itemCircle];

    const json = {
      insertPt: { x: 10, y: 10 },
      items: [
        {
          type: "line",
          p1: { x: 2, y: 3 },
          p2: { x: 4, y: 5 },
          color: "blue",
        },
        {
          type: "circle",
          pt: { x: 10, y: 20 },
          radius: 15,
          color: "red",
        },
      ],
    };

    dto = {
      id: symbol.id,
      projectId: symbol.projectId,
      type: "symbol",
      name: symbolName,
      content: JSON.stringify(json),
    };
  });

  it("toDTO - fromDTO", () => {
    const gotDto = ElementFactory.toDTO(symbol);
    expect(gotDto).toEqual(dto);
    expect(gotDto).toHaveProperty("content");
    expect(gotDto).toHaveProperty("type", symbol.type);
    expect(gotDto).toHaveProperty("name", symbol.name);
    expect(gotDto).toHaveProperty("id", symbol.id);
    expect(gotDto).toHaveProperty("projectId", symbol.projectId);
    expect(gotDto).not.toHaveProperty("items");
    const newSymbol = ElementFactory.fromDTO(gotDto) as GraphicSymbol;
    expect(newSymbol.items[0]).toBeInstanceOf(GraphicLine);
    expect(newSymbol.items[1]).toBeInstanceOf(GraphicCircle);
    expect(newSymbol.items[0].id).toBeFalsy();
    expect(newSymbol.items[1].pageId).toBeFalsy();

    // remove .id .projectId, .pageId from items to compare
    symbol.items = symbol.items.map(p => {
      delete p.pageId;
      delete p.projectId;
      delete p.id;
      return p;
    });
    expect(newSymbol).toEqual(symbol);
  });
  */
});
