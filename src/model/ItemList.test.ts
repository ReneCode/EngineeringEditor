import ItemLine from "./ItemLine";
import ItemCircle from "./ItemCircle";
import ItemList from "./ItemList";
import Point from "../common/point";

describe("ItemList", () => {
  let list: ItemList;
  let json: object;

  beforeEach(() => {
    list = new ItemList("pageId");
    list.items.push(
      new ItemLine("abc", new Point(4, 5), new Point(7, 8)),
    );
    list.items.push(
      new ItemLine("xyz", new Point(1, 2), new Point(3, 4)),
    );
    list.items.push(new ItemCircle("abc", new Point(3, 4), 22));

    json = {
      pageId: "pageId",
      type: "list",
      items: [
        {
          type: "line",
          pageId: "abc",
          p1: { x: 4, y: 5 },
          p2: { x: 7, y: 8 },
        },
        {
          type: "line",
          pageId: "xyz",
          p1: { x: 1, y: 2 },
          p2: { x: 3, y: 4 },
        },
        {
          type: "circle",
          pageId: "abc",
          pt: { x: 3, y: 4 },
          radius: 22,
        },
      ],
    };
  });

  it("create json from ItemList", () => {
    const json = list.toJSON();
    expect(json).toEqual(json);
  });

  it("create ItemList from json", () => {
    const newList = ItemList.fromJSON(json);
    expect(newList).toEqual(list);
    expect(newList instanceof ItemList).toBe(true);
  });
});
