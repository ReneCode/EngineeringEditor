import ItemSymbol from "./ItemSymbol";
import ItemLine from "./ItemLine";
import Point from "../common/point";
import ItemCircle from "./ItemCircle";
import ItemFactory from "./ItemFactory";

describe("ItemSymbol", () => {
  let symbol: ItemSymbol;
  let json: any;

  beforeEach(() => {
    symbol = new ItemSymbol();
    symbol.id = "42";
    symbol.name = "sym-A";
    symbol.insertPt = new Point(10, 10);
    symbol.items = [
      new ItemLine("", new Point(2, 3), new Point(4, 5)),
      new ItemCircle("", new Point(10, 20), 15),
    ];

    json = {
      id: "42",
      projectId: "",
      pageId: "",
      type: "symbol",
      name: "sym-A",
      insertPt: { x: 10, y: 10 },
      items: [
        {
          id: "",
          projectId: "",
          pageId: "",
          type: "line",
          p1: { x: 2, y: 3 },
          p2: { x: 4, y: 5 },
        },
        {
          id: "",
          projectId: "",
          pageId: "",
          type: "circle",
          pt: { x: 10, y: 20 },
          radius: 15,
        },
      ],
    };
  });

  it("create json from ItemSymbol", () => {
    const gotJson = symbol.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create ItemSymbol from json", () => {
    const newSymbol = ItemFactory.fromJSON(json);
    expect(newSymbol).toEqual(symbol);
    expect(newSymbol instanceof ItemSymbol).toBe(true);
  });
});
