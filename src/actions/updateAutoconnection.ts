import * as actionTypes from "./actionTypes";
import { IGlobalState } from "../reducers";
import Placement from "../model/Placement";
import AutoConnectionUtil from "../model/AutoConnectionUtil";
import GraphicLine from "../model/graphic/GraphicLine";
import { GetGlobalStateFunction } from "../model/types";
import { deleteLayerAction } from "./placementActions";

const updateAutoconnection = async (
  dispatch: any,
  getState: GetGlobalStateFunction,
) => {
  await dispatch(deleteLayerAction("autoconnect"));

  const allPlacements = getState().graphic.items;
  const placements = allPlacements.filter(
    (p: Placement) => p.layer !== "autoconnect",
  );

  const ac = new AutoConnectionUtil(placements);
  const pairs = ac.getConnectionPairs();

  const autoconnectionLines: Placement[] = pairs.map(p => {
    const line = new GraphicLine(p.source.pt, p.dest.pt);
    line.layer = "autoconnect";
    return line;
  });

  const action = {
    type: actionTypes.ADD_PLACEMENT,
    payload: autoconnectionLines,
  };
  await dispatch(action);
};

export default updateAutoconnection;