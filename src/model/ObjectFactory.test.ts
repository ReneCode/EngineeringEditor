import Paper, { Point } from "paper";
import GraphicLine from "./graphic/GraphicLine";
import ObjectFactory from "./ObjectFactory";
import GraphicArc from "./graphic/GraphicArc";
import GraphicSymbol from "./graphic/GraphicSymbol";

describe("ObjectFactory", () => {
  it("GraphicLine toJson / fromJson", () => {
    const line = new GraphicLine(new Point(1, 2), new Point(4, 5));
    line.color = "red";

    const json = ObjectFactory.toJSON(line);

    const line2 = ObjectFactory.fromJSON(json) as GraphicLine;

    expect(line2).toBeInstanceOf(GraphicLine);
    expect(line2.color).toEqual(line.color);
    expect(line2.p1).toEqual(line.p1);
  });

  it("GraphicArc toJson / fromJson", () => {
    const arc = new GraphicArc(new Point(1, 2), 50);
    arc.color = "red";
    arc.startAngle = 50;
    arc.endAngle = 240;
    arc.fill = "blue";

    const json = ObjectFactory.toJSON(arc);

    const arc2 = ObjectFactory.fromJSON(json) as GraphicArc;

    expect(arc2).toBeInstanceOf(GraphicArc);
    expect(arc2.color).toEqual(arc.color);
    expect(arc2.center).toEqual(arc.center);
    expect(arc2.startAngle).toEqual(arc.startAngle);
  });

  it("GraphicSymbol toJson / fromJson", () => {
    const arc = new GraphicArc(new Point(1, 2), 50);
    const line = new GraphicLine(new Point(7, 8), new Point(5, 6));
    const symbol = new GraphicSymbol([arc, line]);
    symbol.insertPt = new Point(5, 6);
    symbol.name = "abc";
    symbol.id = "id";

    const json = ObjectFactory.toJSON(symbol);

    const symbol2 = ObjectFactory.fromJSON(json) as GraphicSymbol;

    expect(symbol2).toBeInstanceOf(GraphicSymbol);
    expect(symbol2.insertPt).toEqual(symbol.insertPt);
    expect(symbol2.id).toEqual(symbol.id);
    expect(symbol2.projectId).toEqual(symbol.projectId);
    expect(symbol2.name).toEqual(symbol.name);
  });
});
