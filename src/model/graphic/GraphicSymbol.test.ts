import GraphicSymbol from "./GraphicSymbol";
import Point from "../../common/point";
import GraphicCircle from "./GraphicCircle";
import GraphicLine from "./GraphicLine";
import { DtoElement } from "../dtoUtil";
import ElementFactory from "../ElementFactory";

describe("GraphicSymbol", () => {
  let symbol: GraphicSymbol;
  let dto: DtoElement;

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
    itemLine.color = "blue";
    const itemCircle = new GraphicCircle(new Point(10, 20), 15);
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
    expect(newSymbol).toEqual(symbol);
    expect(newSymbol.items[0] instanceof GraphicLine).toBeTruthy();
    expect(newSymbol.items[1] instanceof GraphicCircle).toBeTruthy();
  });
});
