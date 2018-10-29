import { snap } from "./snap";

describe("snap with 5 step", () => {
  it("snap 7 to 5", () => {
    expect(snap(7, 5)).toBe(5);
  });
  it("snap 8 to 10", () => {
    expect(snap(8, 5)).toBe(10);
  });

  it("snap 12 to 10", () => {
    expect(snap(12, 5)).toBe(10);
  });
  it("snap 13 to 15", () => {
    expect(snap(12, 5)).toBe(10);
  });
});
