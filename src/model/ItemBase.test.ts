import ItemBase from "./ItemBase";

describe("ItemBase", () => {
  it("toJON with empty id", () => {
    const item = new ItemBase("", "line");
    const json = item.toJSON();
    expect(json).toEqual({
      id: "",
      pageId: "",
      projectId: "",
      type: "line",
    });
  });
});
