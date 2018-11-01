import Point from "./point";
import Line from "./line";

interface DistanceLinePointResult {
  lamda: number;
  f: Point;
  distance: number;
}

const distanceLinePoint = (
  line: Line,
  point: Point,
): DistanceLinePointResult => {
  /*
    line: p1, p2
    point: c
  */
  const p1 = { x: line.p1.x, y: line.p1.y };
  const p2 = { x: line.p2.x, y: line.p2.y };
  const c = { x: point.x, y: point.y };

  const delta = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  };
  const k = -(delta.x * c.x + delta.y * c.y);

  const lamda =
    -(delta.x * p1.x + delta.y * p1.y + k) /
    (delta.x * delta.x + delta.y * delta.y);

  const f = new Point(p1.x + lamda * delta.x, p1.y + lamda * delta.y);

  const distance = f.sub(point).length();
  return {
    lamda: lamda,
    f: f,
    distance: distance,
  };
};

export default distanceLinePoint;
