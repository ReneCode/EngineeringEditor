import ItemLine from "./ItemLine";
import ItemCircle from "./ItemCircle";
import ItemGroup from "./ItemGroup";
import Point from "../common/point";
import ItemFactory from "./ItemFactory";
import ItemBase from "./ItemBase";

describe("ItemFactory", () => {
  it("create array of ItemBase from json", () => {
    const json = [
      {
        pageId: 7,
        type: "line",
        p1: {
          x: -20,
          y: 120,
        },
        p2: {
          x: 180,
          y: 120,
        },
        projectId: 81,
        id: 147,
      },
      {
        pageId: 7,
        type: "line",
        p1: {
          x: 40,
          y: 180,
        },
        p2: {
          x: 40,
          y: 60,
        },
        projectId: 81,
        id: 148,
      },
    ];

    const items: ItemBase[] = ItemFactory.fromJSON(json);
    expect(Array.isArray(items)).toBeTruthy();
    expect(items[0] instanceof ItemLine).toBe(true);
  });
});
