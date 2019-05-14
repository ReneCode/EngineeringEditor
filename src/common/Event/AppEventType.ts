export type AppEventType =
  | ""
  | "selectAll"
  | "selectPaperItem" // { item: Paper.Item, append: boolean = false}
  | "delete"
  | "undo"
  | "redo"
  | "zoomIn"
  | "zoomOut"
  | "mouseMove"
  | "mouseDrag"
  | "mouseDown"
  | "mouseUp"
  | "keyDown"
  | "startInteraction";
