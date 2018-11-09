import ItemSymbol from "./ItemSymbol";
import ItemLine from "./ItemLine";
import Point from "../common/point";
import ItemSymbolRef from "./ItemSymbolRef";
import TransformCoordinate from "../common/transformCoordinate";

describe("ItemSymbolRef", () => {
  it("draw with insertPoint", () => {
    const symbol: ItemSymbol = new ItemSymbol();
    symbol.items = [
      new ItemLine("", new Point(100, 50), new Point(200, 50)),
    ];
    const symbolRef = new ItemSymbolRef("");
    symbolRef.symbol = symbol;
    symbolRef.pt = new Point(10, 20);
    const mockLineTo = jest.fn();
    const mockMoveTo = jest.fn();
    const context = {
      beginPath: jest.fn(),
      stroke: jest.fn(),
      lineTo: mockLineTo,
      moveTo: mockMoveTo,
    };

    const transform = new TransformCoordinate(
      { x: 0, y: 0, width: 1000, height: 1000 },
      { width: 1000, height: 1000 },
    );

    // symbolRef.draw(<any>context, transform);
    // expect(mockMoveTo).toHaveBeenCalledWith(100 + 10, 950 + 20);
    // expect(mockLineTo).toHaveBeenCalledWith(200 + 10, 950 + 20);

    // const line = new ItemLine("", new Point(5, 5), new Point(10, 20));
    // line.draw(<any>context, transform);
    // expect(mockMoveTo).toHaveBeenCalledWith(5, 995);
    // expect(mockLineTo).toHaveBeenCalledWith(10, 980);
  });
});
