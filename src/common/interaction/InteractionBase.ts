import Paper from "paper";

export type InteractionContext = {
  dispatch: any; // ReduxAction | ReduxThunkAction;
};

class InteractionBase {
  context: InteractionContext;

  constructor(context: InteractionContext) {
    this.context = context;
  }

  stop() {}
  setSelectedPaperItems(selectedPaperItems: Paper.Item[]) {}

  onMouseDown(event: Paper.MouseEvent) {}
  onMouseUp(event: Paper.MouseEvent) {}
  onMouseMove(event: Paper.MouseEvent) {}
  onMouseDrag(event: Paper.MouseEvent) {}
}

export default InteractionBase;
