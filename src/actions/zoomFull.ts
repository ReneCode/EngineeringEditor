import * as actionTypes from "./actionTypes";
import { IGlobalState } from "../reducers";
import Box from "../common/box";
import Point from "../common/point";

export const zoomFullAction = () => {
  return async (dispatch: any, getState: () => IGlobalState) => {
    try {
      const placements = getState().graphic.items;

      let box: Box;
      if (placements.length === 0) {
        box = new Box(new Point(0, 0), new Point(1000, 1000));
      } else {
        box = placements[0].getBoundingBox();
        placements.forEach(pl => {
          box = box.expandByBox(pl.getBoundingBox());
        });
      }

      // add 5% on each side
      const dx = box.width() * 0.05;
      const dy = box.height() * 0.05;
      dispatch({
        type: actionTypes.SET_VIEWPORT,
        payload: {
          x: box.x() - dx,
          y: box.y() - dy,
          width: box.width() + 2 * dx,
          height: box.height() + 2 * dy,
        },
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};
