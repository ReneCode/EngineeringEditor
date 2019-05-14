import Paper from "paper";
import correctP2WithRatio from "./correctP2WithRatio";

describe("correctP2WithRatio", () => {
  it("fix x-coord", () => {
    const p1 = new Paper.Point(10, 10);
    const p2 = new Paper.Point(100, 60);
    const ratioWH = 2 / 1;
    const newP2 = correctP2WithRatio(p1, p2, ratioWH);
    expect(newP2).toEqual(new Paper.Point(110, 60));
  });
  /*
  delta = 90, 50
  deltaRatio = 90/50  = 1.8
  if (1.8 > 2.0) {

  } else 
  {
    fix x delta
    return (10 + 50 * 2.0, 60)
  }
*/

  it("fix y-coord", () => {
    const p1 = new Paper.Point(10, 10);
    const p2 = new Paper.Point(110, 50);
    const ratioWH = 2 / 1;
    const newP2 = correctP2WithRatio(p1, p2, ratioWH);
    expect(newP2).toEqual(new Paper.Point(110, 60));
  });

  it("fix x-coord not p2.y < p1.y", () => {
    const p1 = new Paper.Point(10, 60);
    const p2 = new Paper.Point(100, 10);
    const ratioWH = 2 / 1;
    const newP2 = correctP2WithRatio(p1, p2, ratioWH);
    expect(newP2).toEqual(new Paper.Point(110, 10));
  });
  /*
    delta = 90, -50
    if (1.8 > 2.0)

    else 
      fix x
      return (10 + -50 * 2.0, 10)
  */
});
