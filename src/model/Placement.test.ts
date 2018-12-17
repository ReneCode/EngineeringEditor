import GraphicBase from "./graphic/GraphicBase";
import Point from "../common/point";
import GraphicLine from "./graphic/GraphicLine";
import Placement from "./Placement";
import GraphicCircle from "./graphic/GraphicCircle";

describe("placement", () => {
  const projectId = "projectId";
  const pageId = "pageId";

  it("test with GraphicCircle", () => {
    const graphic = new GraphicCircle(new Point(2, 3), 10);
    const placement = new Placement(projectId, pageId, graphic);
    expect(placement.graphic).toBe(graphic);
    expect(typeof placement.graphic).toBe("object");

    const json = placement.toDTO();
    expect(typeof json).toBe("object");
    expect(json).toHaveProperty("graphic");
    expect(typeof json.graphic).toBe("string");

    const newPlacement = Placement.fromDTO(json) as Placement;
    expect(newPlacement).toBeTruthy();
    expect(
      newPlacement.graphic instanceof GraphicCircle,
    ).toBeTruthy();
    const circle = newPlacement.graphic as GraphicCircle;
    expect(circle.pt).toEqual(graphic.pt);
  });

  it("test with GraphicLine", () => {
    const graphic = new GraphicLine(new Point(1, 2), new Point(4, 5));
    const placement = new Placement(projectId, pageId, graphic);
    placement.id = "42";
    expect(placement.graphic).toBe(graphic);
    expect(typeof placement.graphic).toBe("object");

    const json = placement.toDTO();
    expect(json).toHaveProperty("graphic");
    expect(typeof json.graphic).toBe("string");

    const newPlacement = Placement.fromDTO(json);
    expect(newPlacement).toBeTruthy();
    expect(newPlacement instanceof Placement).toBeTruthy();
    expect(newPlacement).toHaveProperty("graphic", graphic);
    expect(newPlacement).toEqual(placement);
  });
});
