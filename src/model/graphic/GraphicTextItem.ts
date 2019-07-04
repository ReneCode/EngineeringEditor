import Paper from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

type GetTextFn = (propId: string) => string;
type SetTextFn = (propId: string, text: string) => void;

class GraphicTextItem {
  editDrag: boolean = false;
  editMouseDown: boolean = false;
  getTextFn: GetTextFn | null = null;
  setTextFn: SetTextFn | null = null;

  constructor(public item: Paper.PointText, public propId: string) {}

  public makeEditable(): void {
    this.editReset();
    this.item.onMouseDown = this.onMouseDown.bind(this);
    this.item.onMouseDrag = this.onMouseDrag.bind(this);
    this.item.onMouseUp = this.onMouseUp.bind(this);
  }

  setGetTextFn(fn: GetTextFn) {
    this.getTextFn = fn;
  }

  setSetTextFn(fn: SetTextFn) {
    this.setTextFn = fn;
  }

  draw() {
    if (this.getTextFn) {
      const text = this.getTextFn(this.propId);
      this.item.content = text;
    }
  }

  public endEditText(newText: string) {
    if (this.setTextFn) {
      this.setTextFn(this.propId, newText);
    }
    this.item.visible = true;
    this.draw();
  }

  onMouseDown() {
    this.editMouseDown = true;
  }
  onMouseDrag() {
    this.editDrag = true;
  }

  onMouseUp() {
    if (!this.editDrag && this.editMouseDown) {
      this.startEditText();
    }
    this.editReset();
  }

  editReset() {
    this.editDrag = false;
    this.editMouseDown = false;
  }

  private startEditText() {
    this.item.visible = false;
    const bbox = this.item.bounds;
    const bottomLeftView = Paper.view.projectToView(bbox.bottomLeft);

    const topLeftView = Paper.view.projectToView(bbox.topLeft);
    const heightView = bottomLeftView.y - topLeftView.y;
    // difference of bbox of paper text and <div> text
    // factor tried out
    const deltaHeight = 0.17 * heightView;
    const MENU_HEIGHT = 40;
    appEventDispatcher.dispatch("startEditText", {
      callback: this.endEditText.bind(this),
      show: true,
      text: this.item.content,
      left: `${topLeftView.x}px`,
      top: `${topLeftView.y + MENU_HEIGHT - deltaHeight}px`,
      color: this.item.fillColor,
      fontFamily: this.item.fontFamily,
      fontSize: `${heightView}px`,
    });
  }
}

export default GraphicTextItem;
