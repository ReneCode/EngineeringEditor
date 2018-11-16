import PlacementBase from "./Placement";
import GraphicBase from "./graphic/GraphicBase";
import Point from "../common/point";
import GraphicLine from "./graphic/GraphicLine";
import Placement from "./Placement";

describe("placement", () => {
  const projectId = "projectId";
  const pageId = "pageId";

  it("test with graphicBase", () => {
    const graphic = new GraphicBase("line");
    const placement = new PlacementBase(projectId, pageId, graphic);
    expect(placement.graphic).toBe(graphic);
    expect(typeof placement.graphic).toBe("object");

    const json = placement.toJSON();
    expect(typeof json).toBe("object");
    expect(json).toHaveProperty("graphic");
    expect(typeof json.graphic).toBe("string");
  });

  it("test with GraphicLine", () => {
    const graphic = new GraphicLine(new Point(1, 2), new Point(4, 5));
    const placement = new PlacementBase(projectId, pageId, graphic);
    placement.id = "42";
    expect(placement.graphic).toBe(graphic);
    expect(typeof placement.graphic).toBe("object");

    const json = placement.toJSON();
    console.log(json);
    expect(json).toHaveProperty("graphic");
    expect(typeof json.graphic).toBe("string");

    const newPlacement = Placement.fromJSON(json);
    expect(newPlacement).toBeTruthy();
    expect(newPlacement instanceof Placement).toBeTruthy();
    expect(newPlacement.graphic).toEqual(graphic);
    expect(newPlacement).toEqual(placement);
  });
});
