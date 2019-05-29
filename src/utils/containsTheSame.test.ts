import containsTheSame from "./containsTheSame";

describe("containsTheSame", () => {
  it("different length of array  => false", () => {
    expect(containsTheSame([1, 2, 3], [])).toBe(false);
  });
  it("same order of array  => true", () => {
    expect(containsTheSame([1, 2, 3], [1, 2, 3])).toBe(true);
  });
  it("other order of array  => true", () => {
    expect(containsTheSame([3, 1, 2], [1, 2, 3])).toBe(true);
  });
  it("other type of array  => false", () => {
    expect(containsTheSame([3, 1, 2], ["1", 2, 3])).toBe(false);
  });
});
