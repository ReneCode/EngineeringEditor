import ItemCircle from "./ItemCircle";
import Point from "../common/point";
import { any } from "prop-types";
import ItemFactory from "./ItemFactory";

describe("ItemCircle", () => {
  let circle: ItemCircle;
  let json: any;

  beforeEach(() => {
    const pt = new Point(7, 8);
    circle = new ItemCircle("abc", pt, 14);
    circle.id = 42;
    json = {
      id: 42,
      type: "circle",
      pageId: "abc",
      pt: { x: 7, y: 8 },
      radius: 14,
    };
  });

  // it("toJSON without id, pageId", () => {
  //   const c = new ItemCircle("", circle.pt, circle.radius);
  //   const gotJson = c.toJSON();
  //   expect(gotJson).toEqual({
  //     type: "circle",
  //     pt: { x: 7, y: 8 },
  //     radius: 14,
  //   });
  // });

  it("create json from ItemCircle", () => {
    const gotJson = circle.toJSON();
    expect(gotJson).toEqual(json);
  });

  it("create ItemCircle from json", () => {
    const newCircle = ItemFactory.fromJSON(json);
    expect(newCircle).toEqual(circle);
    expect(newCircle instanceof ItemCircle).toBe(true);
  });
});
