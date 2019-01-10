import Box from "./box";
import Point from "./point";

describe("box", () => {
  it("bottomLeft to topRight", () => {
    const box = new Box(new Point(50, 140), new Point(40, 130));
    expect(box.bottomLeft()).toEqual(new Point(40, 130));
    expect(box.bottomRight()).toEqual(new Point(50, 130));
    expect(box.topLeft()).toEqual(new Point(40, 140));
    expect(box.topRight()).toEqual(new Point(50, 140));
    expect(box).toEqual(
      new Box(new Point(40, 130), new Point(50, 140)),
    );
  });

  it("expandByPoint", () => {
    let box = new Box(new Point(50, 140), new Point(40, 130));
    box = box.expandByPoint(new Point(30, 200));
    expect(box).toEqual(
      new Box(new Point(30, 130), new Point(50, 200)),
    );
  });

  it("expandByPoint nothing changed", () => {
    let box = new Box(new Point(50, 140), new Point(40, 130));
    box = box.expandByPoint(new Point(42, 130));
    expect(box).toEqual(
      new Box(new Point(40, 130), new Point(50, 140)),
    );
  });

  it("expandByBox", () => {
    let box = new Box(new Point(20, 170), new Point(80, 100));
    const otherBox = new Box(new Point(50, 50), new Point(250, 350));
    box = box.expandByBox(otherBox);
    expect(box).toEqual(
      new Box(new Point(20, 50), new Point(250, 350)),
    );
  });

  it("expandByBox nothing changed", () => {
    let box = new Box(new Point(20, 170), new Point(80, 100));
    const otherBox = new Box(new Point(50, 120), new Point(70, 150));
    box = box.expandByBox(otherBox);
    expect(box).toEqual(
      new Box(new Point(20, 100), new Point(80, 170)),
    );
  });

  it("width height x  y", () => {
    let box = new Box(new Point(20, 170), new Point(80, 100));
    expect(box.width()).toEqual(60);
    expect(box.height()).toEqual(70);
    expect(box.x()).toEqual(20);
    expect(box.y()).toEqual(100);
  });
});
