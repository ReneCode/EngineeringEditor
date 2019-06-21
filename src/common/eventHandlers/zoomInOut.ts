import Paper from "paper";

import appEventDispatcher from "../Event/AppEventDispatcher";

const zoomInHandler = (center: Paper.Point) => {
  Paper.view.scale(1.2, getCenter(center));
};

const zoomOutHandler = (center: Paper.Point) => {
  Paper.view.scale(0.8, getCenter(center));
};

const getCenter = (center: Paper.Point): Paper.Point => {
  if (center) {
    return center;
  }
  return Paper.view.center;
};

// self register
const register = () => {
  appEventDispatcher.subscribe("zoomIn", zoomInHandler);
  appEventDispatcher.subscribe("zoomOut", zoomOutHandler);
};
register();
