import Paper from "paper";
import * as actionTypes from "../actions/actionTypes";
import { IGlobalState } from "../reducers";
import Placement from "../model/Placement";

const drawCanvasMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  try {
    if (action.type === actionTypes.SET_PLACEMENT) {
      // const preState: IGlobalState = store.getState();
      const placements: Placement[] = action.payload;

      drawCanvas(Paper.project, placements);
    }
  } catch (ex) {
    console.log("Exception:", ex);
  }
  const result = next(action);
  return result;
};

const drawCanvas = (project: Paper.Project, items: Placement[]) => {
  console.log("draw Canvas:", items.length);
  project.activeLayer.removeChildren();
  items.forEach(placement => {
    placement.paperDraw();
  });
};
export default drawCanvasMiddleware;
