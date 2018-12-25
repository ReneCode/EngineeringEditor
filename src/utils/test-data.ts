import GraphicLine from "../model/graphic/GraphicLine";
import Point from "../common/point";

const lineA = new GraphicLine(new Point(3, 4), new Point(6, 7));
lineA.id = "idA";
lineA.projectId = "projectId";
lineA.pageId = "pageId";
lineA.color = "red";

const lineB = new GraphicLine(new Point(30, 40), new Point(60, 70));
lineB.id = "idB";
lineB.projectId = "projectIdB";
lineB.pageId = "pageIdB";
lineB.color = "blue";

const testData = {
  lineA,
  lineB,
};

export default testData;
