import Paper from "paper";

class PaperUtil {
  static PointDiff(p1: Paper.Point, p2: Paper.Point) {
    return new Paper.Point(p2.x - p1.x, p2.y - p1.y);
  }
}

export default PaperUtil;
