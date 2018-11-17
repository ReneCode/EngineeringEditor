import GraphicSymbol from "./GraphicSymbol";
import Point from "../../common/point";
import GraphicCircle from "./GraphicCircle";
import GraphicLine from "./GraphicLine";
import GraphicFactory from "./GraphicFactory";

describe("GraphicSymbol", () => {
  let symbol: GraphicSymbol;
  const projectId = "prjId";
  const symbolName = "mySymbol";
  let json: any;

  beforeEach(() => {
    symbol = new GraphicSymbol(projectId, symbolName);
    symbol.id = "4321";
    symbol.insertPt = new Point(10, 10);
    symbol.items = [
      new GraphicLine(new Point(2, 3), new Point(4, 5)),
      new GraphicCircle(new Point(10, 20), 15),
    ];

    json = {
      type: "symbol",
      name: symbolName,
      insertPt: { x: 10, y: 10 },
      items: [
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
      ],
    };
  });

  it("toDTO - fromDTO", () => {
    const dto = symbol.toDTO();
    expect(dto).toHaveProperty("content");
    expect(dto).not.toHaveProperty("items");
    const newSymbol = GraphicSymbol.fromDTO(dto);
    expect(newSymbol).toEqual(symbol);
  });
});
