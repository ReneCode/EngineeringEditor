import Paper from "paper";
import Placement from "../model/Placement";
import { ItemMetaData } from "./ItemMetaData";

const drawCanvas = (project: Paper.Project, items: Placement[]) => {
  project.activeLayer.removeChildren();
  // const circle = new Paper.Path.Circle(new Paper.Point(130, 240), 30);
  // circle.strokeColor = "red";
  // circle.fillColor = "blue";

  console.log("drawCanvas");
  items.forEach(placement => {
    const paperItem = placement.paperDraw();
    if (paperItem) {
      const metaData: ItemMetaData = {
        placement: placement,
        rev: 1,
      };
      paperItem.data = metaData;
    }
  });
};

export default drawCanvas;
