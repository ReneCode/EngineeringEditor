import { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import GraphicLine from "./GraphicLine";
import GraphicSymbolRef from "./GraphicSymbolRef";
import TransformCoordinate from "../../common/transformCoordinate";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

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
    expect(copy.getName()).toEqual(symbolRef.getName());
    expect(copy.getPoint()).toEqual(symbolRef.getPoint());
  });

  it("toJSON / fromJSON", () => {
    const symbol = new GraphicSymbol([]);
    symbolRef.setSymbol(symbol);
    expect(symbolRef.getSymbol).toBeTruthy();

    const json = symbolRef.toJSON();
    const newSymbolRef = GraphicSymbolRef.fromJSON(json);
    expect(newSymbolRef.getName()).toEqual(symbolRef.getName());
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
    expect(newSymbolRef.getName()).toEqual(symbolRef.getName());
    expect(newSymbolRef.id).toEqual(symbolRef.id);
    expect(newSymbolRef.getSymbol()).toBeFalsy();
  });
});
