import Paper from "paper";
import { IAction } from "../../actions/action";
import { ThunkAction } from "redux-thunk";
import { GetGlobalStateFunction } from "../../model/types";

export type InteractionContext = {
  dispatch: any; // ReduxAction | ReduxThunkAction;
};

class InteractionBase {
  context: InteractionContext;

  constructor(context: InteractionContext) {
    this.context = context;
  }

  stop() {}
  onMouseDown(event: Paper.MouseEvent) {}
  onMouseUp(event: Paper.MouseEvent) {}
  onMouseMove(event: Paper.MouseEvent) {}
  onMouseDrag(event: Paper.MouseEvent) {}
}

export default InteractionBase;
