import GraphicSymbol from "./GraphicSymbol";
import GraphicLine from "./GraphicLine";
import Point from "../../common/point";
import GraphicSymbolRef from "./GraphicSymbolRef";
import TransformCoordinate from "../../common/transformCoordinate";
import { DtoPlacement } from "../dtoUtil";
import PlacementFactory from "../PlacementFactory";

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

    json = {
      name: symbolName,
      pt: { x: 7, y: 8 },
    };

    dto = {
      id: symbolRef.id,
      projectId: symbolRef.projectId,
      pageId: symbolRef.pageId,
      type: "symbolref",
      content: JSON.stringify(json),
    };
  });

  it("toDTO & fromDTO", () => {
    const gotDto = PlacementFactory.toDTO(symbolRef);
    expect(gotDto).toEqual(dto);
    const gotSymbolRef = PlacementFactory.fromDTO(gotDto);
    expect(gotSymbolRef instanceof GraphicSymbolRef).toBeTruthy();
    expect(gotSymbolRef).toEqual(symbolRef);
  });

  it("draw with insertPoint", () => {
    const projectId = "projectId";
    const name = "name";

    const symbol = new GraphicSymbol(projectId, name);
    symbol.items = [
      new GraphicLine(new Point(100, 50), new Point(200, 50)),
    ];
    const symbolRef = new GraphicSymbolRef(symbol.name);
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
