import { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import GraphicLine from "./GraphicLine";
import GraphicSymbolRef from "./GraphicSymbolRef";
import TransformCoordinate from "../../common/transformCoordinate";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";
import GraphicArc from "./GraphicArc";
import updateSymbolRef from "../util/updateSymbolRef";

describe("GraphicSymbolRef", () => {
  let symbolRef: GraphicSymbolRef;

  beforeEach(() => {
    const symbolName = "symbolName";
    const pt = new Point(7, 8);
    symbolRef = new GraphicSymbolRef(symbolName, pt);
    symbolRef.projectId = "projectId";
    symbolRef.pageId = "pageId";
    symbolRef.id = "id";
  });

  it("clone", () => {
    const copy = symbolRef.clone();
    expect(copy.name).toEqual(symbolRef.name);
    expect(copy.pt).toEqual(symbolRef.pt);
  });

  it("toJSON / fromJSON", () => {
    const symbol = new GraphicSymbol([], new Point(100, 100));
    symbolRef.setSymbol(symbol);
    expect(symbolRef.getSymbol).toBeTruthy();

    const json = symbolRef.toJSON();
    const newSymbolRef = GraphicSymbolRef.fromJSON(json);
    expect(newSymbolRef.name).toEqual(symbolRef.name);
    expect(newSymbolRef.id).toEqual(symbolRef.id);
    expect(newSymbolRef.getSymbol()).toBeFalsy();
  });

  it("toDTO & fromDTO", () => {
    const dto = PlacementFactory.toDTO(symbolRef);
    const newSymbolRef = PlacementFactory.fromDTO(
      dto,
    ) as GraphicSymbolRef;
    expect(newSymbolRef).toBeTruthy();
    expect(newSymbolRef instanceof GraphicSymbolRef).toBeTruthy();
    expect(newSymbolRef.name).toEqual(symbolRef.name);
    expect(newSymbolRef.id).toEqual(symbolRef.id);
    expect(newSymbolRef.getSymbol()).toBeFalsy();
  });

  it("clone", () => {
    const line = new GraphicLine(new Point(5, 6), new Point(3, 20));
    const arc = new GraphicArc(new Point(10, 10), 40);
    const symbolA = new GraphicSymbol(
      [line, arc],
      new Point(100, 100),
    );
    symbolA.name = "testSymbol";

    const symbolRefA = new GraphicSymbolRef(symbolA.name);
    updateSymbolRef([symbolRefA], [symbolA]);
    const sym = symbolRefA.getSymbol();
    expect(sym).toBeTruthy();
    expect((sym as GraphicSymbol).name).toEqual(symbolA.name);

    const symbolRefB = symbolRefA.clone();

    expect(symbolRefB).toBeTruthy;
    expect(symbolRefB.name).toEqual(symbolA.name);
    const cloneSymbol = symbolRefB.getSymbol();
    expect(cloneSymbol).toBeTruthy();
    expect((cloneSymbol as GraphicSymbol).name).toEqual(symbolA.name);
  });
});
