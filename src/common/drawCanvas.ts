import Paper from "paper";
import Placement from "../model/Placement";

const drawCanvas = (view: Paper.View, items: Placement[]) => {
  Paper.project.activeLayer.removeChildren();
  const circle = new Paper.Path.Circle(new Paper.Point(130, 240), 30);
  circle.strokeColor = "red";
  circle.fillColor = "blue";

  items.forEach(p => {
    p.paperDraw();
  });
};

export default drawCanvas;
