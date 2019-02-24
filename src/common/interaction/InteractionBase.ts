import Paper from "paper";
import { IAction } from "../../actions/action";
import { ThunkAction } from "redux-thunk";
import { GetGlobalStateFunction } from "../../model/types";

type ReduxAction = (event: IAction) => any;
type ReduxThunkAction = (func: any) => Promise<any>;

export type InteractionContext = {
  dispatch: any; // ReduxAction | ReduxThunkAction;
};

class InteractionBase {
  context: InteractionContext;

  constructor(context: InteractionContext) {
    this.context = context;
  }

  onMouseDown(event: Paper.MouseEvent) {}
  onMouseUp(event: Paper.MouseEvent) {}
  onMouseMove(event: Paper.MouseEvent) {}
  onMouseDrag(event: Paper.MouseEvent) {}
}

export default InteractionBase;
