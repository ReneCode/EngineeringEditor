import PaperUtil from "./PaperUtil";

describe("PaperUtil", () => {
  it("getRemovedStrings", () => {
    const rem = PaperUtil.getRemovedStrings(
      ["1", "2", "3"],
      ["1", "2"],
    );
    expect(rem).toEqual(["3"]);
  });

  it("getAddedStrings", () => {
    const rem = PaperUtil.getAddedStrings(
      ["1", "2", "3"],
      ["1", "2", "4"],
    );
    expect(rem).toEqual(["4"]);
  });
});
