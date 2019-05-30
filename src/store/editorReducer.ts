import Paper from "paper";
import { IAction } from "../actions/action";

export interface IEditorState {
  selectedPaperItems: Paper.Item[];
  boundingRectangle: Paper.Rectangle;
}

const initialEditorState: IEditorState = {
  selectedPaperItems: [],
  boundingRectangle: new Paper.Rectangle(0, 0, 0, 0),
};

function editorReducer(
  state: IEditorState = initialEditorState,
  action: IAction,
): IEditorState {
  switch (action.type) {
    default:
      return state;
  }
}

export default editorReducer;
