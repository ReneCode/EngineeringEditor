import GraphicLine from "../model/graphic/GraphicLine";
import Point from "../common/point";

const lineA = new GraphicLine(new Point(3, 4), new Point(6, 7));
lineA.id = "idA";
lineA.projectId = "projectId";
lineA.pageId = "pageId";

const testData = {
  lineA,
};

export default testData;
