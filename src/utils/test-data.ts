import Paper from "paper";
import GraphicLine from "../model/graphic/GraphicLine";

const lineA = new GraphicLine(
  new Paper.Point(3, 4),
  new Paper.Point(6, 7),
);
lineA.id = "idA";
lineA.projectId = "projectId";
lineA.pageId = "pageId";
lineA.color = "red";

const lineB = new GraphicLine(
  new Paper.Point(30, 40),
  new Paper.Point(60, 70),
);
lineB.id = "idB";
lineB.projectId = "projectIdB";
lineB.pageId = "pageIdB";
lineB.color = "blue";

const testData = {
  lineA,
  lineB,
};

export default testData;
