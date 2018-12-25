import GraphicSymbol from "./GraphicSymbol";
import Point from "../../common/point";
import GraphicCircle from "./GraphicCircle";
import GraphicLine from "./GraphicLine";
import GraphicFactory from "./GraphicFactory";
import { DtoElement } from "../dtoUtil";

describe.only("GraphicSymbol", () => {
  let symbol: GraphicSymbol;
  let json: any;
  let dto: DtoElement;

  beforeEach(() => {
    const projectId = "prjId";
    const symbolName = "mySymbol";
    symbol = new GraphicSymbol(projectId, symbolName);
    symbol.id = "4321";
    symbol.insertPt = new Point(10, 10);
    symbol.items = [
      new GraphicLine(new Point(2, 3), new Point(4, 5)),
      new GraphicCircle(new Point(10, 20), 15),
    ];

    json = {
      name: symbolName,
      insertPt: { x: 10, y: 10 },
      items: JSON.stringify([
        {
          type: "line",
          p1: { x: 2, y: 3 },
          p2: { x: 4, y: 5 },
        },
        {
          type: "circle",
          pt: { x: 10, y: 20 },
          radius: 15,
        },
      ]),
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
    const gotDto = symbol.toDTO();
    console.log("**", gotDto, "##");
    expect(gotDto).toHaveProperty("content");
    expect(gotDto).toHaveProperty("type", symbol.type);
    expect(gotDto).toHaveProperty("name", symbol.name);
    expect(gotDto).toHaveProperty("id", symbol.id);
    expect(gotDto).toHaveProperty("projectId", symbol.projectId);
    expect(gotDto).not.toHaveProperty("items");
    const newSymbol = GraphicSymbol.fromDTO(gotDto);
    expect(newSymbol).toEqual(symbol);
  });
});
