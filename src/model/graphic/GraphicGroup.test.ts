import { Point } from "paper";
import GraphicLine from "./GraphicLine";
import GraphicSymbol from "./GraphicSymbol";
import GraphicArc from "./GraphicArc";
import GraphicSymbolRef from "./GraphicSymbolRef";
import updateSymbolRef from "../util/updateSymbolRef";
import GraphicGroup from "./GraphicGroup";

describe("GraphicGroup", () => {
  beforeEach(() => {});

  it.only("clone group with symbol", () => {
    const line = new GraphicLine(new Point(4, 5), new Point(6, 7));
    const symbol = new GraphicSymbol([line], new Point(100, 100));
    symbol.name = "symbol-test";

    const symbolRef = new GraphicSymbolRef(symbol.name);
    const arc = new GraphicArc(new Point(10, 10), 40);

    updateSymbolRef([symbolRef], [symbol]);
    const sym = symbolRef.getSymbol();
    expect(sym).toBeTruthy();
    expect((sym as GraphicSymbol).name).toEqual(symbol.name);

    const group = new GraphicGroup([symbolRef, arc]);
    expect(group).toBeTruthy;
    expect(group.children).toHaveLength(2);

    const clone = group.clone();
    expect(clone).toBeTruthy;
    expect(clone.children).toHaveLength(2);
    expect(clone.children[0]).toBeInstanceOf(GraphicSymbolRef);
    expect(clone.children[1]).toBeInstanceOf(GraphicArc);
    const cloneSymbolRef = clone.children[0] as GraphicSymbolRef;
    expect(cloneSymbolRef.name).toEqual(symbol.name);
    const cloneSymbol = cloneSymbolRef.getSymbol();
    expect(cloneSymbol).toBeTruthy();
  });
});
