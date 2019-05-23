import { concatUnique } from "./concatUnique";

describe("concatUnique", () => {
  it("add new item", () => {
    const result = concatUnique<string>(["a"], "b");
    expect(result).toEqual(["a", "b"]);
  });

  it("add existins item", () => {
    const result = concatUnique<string>(["a", "b", "c"], "b");
    expect(result).toEqual(["a", "b", "c"]);
  });
});
