import ItemLine from "./ItemLine";
import ItemCircle from "./ItemCircle";
import ItemGroup from "./ItemGroup";
import Point from "../common/point";
import ItemFactory from "./ItemFactory";

describe("ItemGroup", () => {
  let group: ItemGroup;
  let json: object;

  beforeEach(() => {
    group = new ItemGroup("pageId");
    group.items.push(
      new ItemLine("abc", new Point(4, 5), new Point(7, 8)),
    );
    group.items.push(
      new ItemLine("xyz", new Point(1, 2), new Point(3, 4)),
    );
    group.items.push(new ItemCircle("abc", new Point(3, 4), 22));

    json = {
      id: 0,
      projectId: "",
      pageId: "pageId",
      type: "group",
      items: [
        {
          id: 0,
          type: "line",
          projectId: "",
          pageId: "abc",
          p1: { x: 4, y: 5 },
          p2: { x: 7, y: 8 },
        },
        {
          id: 0,
          type: "line",
          projectId: "",
          pageId: "xyz",
          p1: { x: 1, y: 2 },
          p2: { x: 3, y: 4 },
        },
        {
          id: 0,
          type: "circle",
          projectId: "",
          pageId: "abc",
          pt: { x: 3, y: 4 },
          radius: 22,
        },
      ],
    };
  });

  it("create json from ItemGroup", () => {
    const json = group.toJSON();
    expect(json).toEqual(json);
  });

  it("create ItemGroup from json", () => {
    const newGroup = ItemFactory.fromJSON(json);
    expect(newGroup).toEqual(group);
    expect(newGroup instanceof ItemGroup).toBe(true);
  });
});
