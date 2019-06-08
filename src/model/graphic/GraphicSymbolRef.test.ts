import { Point } from "paper";
import GraphicSymbol from "./GraphicSymbol";
import GraphicLine from "./GraphicLine";
import GraphicSymbolRef from "./GraphicSymbolRef";
import TransformCoordinate from "../../common/transformCoordinate";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";
import Placement from "../Placement";

describe("GraphicSymbolRef", () => {
  let symbolRef: GraphicSymbolRef;
  let json: any;
  let dto: DtoPlacement;

  beforeEach(() => {
    const symbolName = "symbolName";
    const pt = new Point(7, 8);
    symbolRef = new GraphicSymbolRef(symbolName, pt);
    symbolRef.projectId = "projectId";
    symbolRef.pageId = "pageId";
    symbolRef.id = "id";
  });

  it("toJSON / fromJSON", () => {
    const symbol = new GraphicSymbol([]);
    symbolRef.setSymbol(symbol);
    expect(symbolRef.getSymbol).toBeTruthy();

    const json = symbolRef.asJSON();
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
});
