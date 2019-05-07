import Paper from "paper";

const correctP2WithRatio = (
  p1: Paper.Point,
  p2: Paper.Point,
  ratioWH: number,
): Paper.Point => {
  const delta = p2.subtract(p1);
  const ratio = delta.x / delta.y;
  const ratioSign = Math.sign(ratio);
  if (Math.abs(delta.x / delta.y) > Math.abs(ratioWH)) {
    return new Paper.Point(
      p2.x,
      p1.y + (ratioSign * delta.x) / ratioWH,
    );
  } else {
    return new Paper.Point(
      p1.x + ratioSign * delta.y * ratioWH,
      p2.y,
    );
  }
};

export default correctP2WithRatio;
