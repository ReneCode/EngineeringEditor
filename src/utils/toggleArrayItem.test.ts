import toggleArrayItem from "./toggleArrayItem";

describe("toggleArrayItem", () => {
  it("add item at the end", () => {
    expect(toggleArrayItem([1, 2], 3)).toEqual([1, 2, 3]);
  });
  it("remove item", () => {
    expect(toggleArrayItem([1, 2], 2)).toEqual([1]);
  });
  it("add to empty array", () => {
    expect(toggleArrayItem([], "a")).toEqual(["a"]);
  });
  it("add other type", () => {
    expect(toggleArrayItem(["1"], 1)).toEqual(["1", 1]);
  });
});
