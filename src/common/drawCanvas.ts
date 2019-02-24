import Paper from "paper";
import Placement from "../model/Placement";

const drawCanvas = (project: Paper.Project, items: Placement[]) => {
  project.activeLayer.removeChildren();
  // const circle = new Paper.Path.Circle(new Paper.Point(130, 240), 30);
  // circle.strokeColor = "red";
  // circle.fillColor = "blue";

  items.forEach(p => {
    const paperItem = p.paperDraw();
    if (paperItem) {
      paperItem.data = p;
    }
  });
};

export default drawCanvas;
