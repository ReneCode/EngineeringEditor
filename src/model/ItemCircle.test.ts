import ItemCircle from "./ItemCircle";
import Point from "../common/point";
import { any } from "prop-types";

describe("ItemCircle", () => {
  let circle: ItemCircle;
  let json: any;

  beforeEach(() => {
    const pt = new Point(7, 8);
    circle = new ItemCircle("abc", pt, 14);
    json = {
      type: "circle",
      pageId: "abc",
      pt: { x: 7, y: 8 },
      radius: 14,
    };
  });

  it("create json from ItemCircle", () => {
    const json = circle.toJSON();
    expect(json).toEqual(json);
  });

  it("create ItemCircle from json", () => {
    const newCircle = ItemCircle.fromJSON(json);
    expect(newCircle).toEqual(circle);
    expect(newCircle instanceof ItemCircle).toBe(true);
  });
});
