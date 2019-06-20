import Paper, { Item } from "paper";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemName";
import configuration from "../../common/configuration";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import deepClone from "../../common/deepClone";

class GraphicText extends Placement {
  pt: Paper.Point;
  text: string;
  fontFamily: string = "Arial";
  fontSize: number = 48;

  editStartPoint: Paper.Point = new Paper.Point(0, 0);
  editDrag: boolean = false;
  editMouseDown: boolean = false;

  constructor(text: string, pt: Paper.Point) {
    super("text");
    this.text = text;
    this.pt = pt;
  }

  clone() {
    return deepClone(this) as GraphicText;
  }

  static fromJSON(json: any): GraphicText {
    const text = Object.create(GraphicText.prototype);
    return Object.assign(text, json, {
      pt: PaperUtil.PointFromJSON(json.pt),
      text: json.text,
      fontFamily: json.fontFamily,
      fontSize: json.fontSize,
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      pt: PaperUtil.PointToJSON(this.pt),
      text: this.text,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
    };
  }

  public setText(text: string) {
    this.text = text;
  }

  translate(delta: Paper.Point) {
    this.pt = this.pt.add(delta);
  }

  paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
        this.removeTempItems();
        this.setPaperItem(this.createPaperItem());
        break;

      case "highlight":
        {
          this.removeTempItems();

          const item = this.createBoundingRect();
          this.addTempItem(item);
        }
        break;
      case "select":
        {
          this.removeTempItems();
          this.editReset();
          this._item.onMouseDown = this.onMouseDown.bind(this);
          this._item.onMouseDrag = this.onMouseDrag.bind(this);
          this._item.onMouseUp = this.onMouseUp.bind(this);
          const item = this.createBoundingRect();
          this.addTempItem(item);
        }
        break;
    }

    return this.getPaperItem();
  }

  onMouseDown(event: Paper.MouseEvent) {
    this.editMouseDown = true;
  }
  onMouseDrag(event: Paper.MouseEvent) {
    this.editDrag = true;
  }

  onMouseUp(event: Paper.MouseEvent) {
    if (!this.editDrag && this.editMouseDown) {
      this.removeTempItems();

      this.startEditText();
    }
    this.editReset();
  }

  editReset() {
    this.editDrag = false;
    this.editMouseDown = false;
  }

  createPaperItem(): Paper.Item {
    const item = new Paper.PointText(this.pt);
    item.name = ItemName.itemText;
    item.data = this.id;
    item.content = this.text;
    if (this.color) {
      item.fillColor = this.color;
    }
    item.fontSize = this.fontSize;
    item.fontFamily = this.fontFamily;
    item.leading = this.fontSize;
    return item;
  }

  private startEditText() {
    this.getPaperItem().visible = false;
    const bbox = this._item.bounds;
    const bottomLeftView = Paper.view.projectToView(bbox.bottomLeft);

    const topLeftView = Paper.view.projectToView(bbox.topLeft);
    const heightView = bottomLeftView.y - topLeftView.y;
    // difference of bbox of paper text and <div> text
    // factor tried out
    const deltaHeight = 0.17 * heightView;
    const MENU_HEIGHT = 40;
    appEventDispatcher.dispatch("startEditText", {
      placementId: this.id,
      show: true,
      text: this.text,
      left: `${topLeftView.x}px`,
      top: `${topLeftView.y + MENU_HEIGHT - deltaHeight}px`,
      color: this.color,
      fontFamily: this.fontFamily,
      fontSize: `${heightView}px`,
    });
  }

  createBoundingRect(): Paper.Item {
    if (!this._item) {
      return new Paper.Item();
    }
    const bbox = this._item.bounds;
    let item = new Paper.Path.Rectangle(bbox);
    item.strokeColor = configuration.modeHighlightColor;
    item.name = ItemName.temp;
    return item;
  }
}

export default GraphicText;
