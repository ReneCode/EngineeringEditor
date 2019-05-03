import Paper from "paper";

class A {
  public draw(): Paper.Item {
    return new Paper.Path.Circle(new Paper.Point(2, 3), 30);
  }
}

describe("one", () => {
  it("t1", () => {
    const a = new A();
    expect(3).toBe(3);
  });
});
