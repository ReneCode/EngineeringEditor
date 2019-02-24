import Paper from "paper";
import { IAction } from "../../actions/action";

export type InteractionContext = {
  dispatch: (ev: IAction) => {};
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
