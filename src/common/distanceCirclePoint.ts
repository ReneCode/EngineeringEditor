import Point from "./point";
import Arc from "./arc";

const distanceCirclePoint = (arc: Arc, point: Point): number => {
  /*
    arc: pt, r
    point: c
  */

  // distance point - arc-middle-point
  const distance: number = Math.abs(
    point.sub(arc.pt).length() - arc.r,
  );
  return distance;
};

export default distanceCirclePoint;
