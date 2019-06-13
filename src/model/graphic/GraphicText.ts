import Paper from "paper";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemMetaData";
import configuration from "../../common/configuration";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

class GraphicText extends Placement {
  pt: Paper.Point;
  text: string;
  fontFamily: string = "Arial";
  fontSize: number = 48;

  constructor(text: string, pt: Paper.Point) {
    super("text");
    this.text = text;
    this.pt = pt;
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

  setMode(drawMode: DrawMode) {
    if (drawMode === this._drawMode) {
      return;
    }
    this._drawMode = drawMode;
    this.drawTempItems();
  }

  dragItem(event: Paper.MouseEvent) {
    if (this._item) {
      this.translate(event.delta);
      this.paperDraw();
      for (let item of this._tempItems) {
        item.position = item.position.add(event.delta);
      }
    }
  }

  translate(delta: Paper.Point) {
    this.pt = this.pt.add(delta);
  }

  paperDraw(): Paper.Item {
    const item = this.createPaperItem();
    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  createPaperItem(): Paper.Item {
    const item = new Paper.PointText(this.pt);
    item.name = ItemName.itemText;
    item.data = this.id;
    item.content = this.text;
    if (this.color) {
      item.fillColor = this.color;
    }
    // item.fillColor = "red";
    item.fontSize = this.fontSize;
    item.fontFamily = this.fontFamily;
    item.leading = this.fontSize * 1.0;
    return item;
  }

  private drawTempItems() {
    if (this._tempItems) {
      for (let item of this._tempItems) {
        item.remove();
      }
    }
    appEventDispatcher.dispatch("showEditText", {
      show: false,
    });

    this._tempItems = [];
    switch (this._drawMode) {
      case "select":
        {
          const item = this.createBoundingRect(ItemName.temp);

          item.strokeColor = configuration.modeSelectColor;
          this._tempItems.push(item);
        }
        break;
      case "edit":
        {
          const item = this.createBoundingRect(ItemName.temp);
          item.strokeColor = configuration.modeSelectColor;
          item.fillColor = "#2e2e2e11";
          this._tempItems.push(item);
          item.onMouseDown = this.startEditText.bind(this);
        }
        break;
    }
    // prevLayer.activate();
  }

  private startEditText() {
    const bbox = this._item.bounds;
    const bottomLeftView = Paper.view.projectToView(bbox.bottomLeft);

    const topLeftView = Paper.view.projectToView(bbox.topLeft);
    const heightView = bottomLeftView.y - topLeftView.y;
    // difference of bbox of paper text and <div> text
    // factor tried out
    const deltaHeight = 0.17 * heightView;
    const MENU_HEIGHT = 40;
    appEventDispatcher.dispatch("showEditText", {
      show: true,
      text: this.text,
      left: `${topLeftView.x}px`,
      top: `${topLeftView.y + MENU_HEIGHT - deltaHeight}px`,
      color: "green", // this.color,
      fontFamily: this.fontFamily,
      fontSize: `${heightView}px`,
    });
    // this._item.visible = false;
  }

  createBoundingRect(name: string): Paper.Item {
    if (!this._item) {
      return new Paper.Item();
    }
    const bbox = this._item.bounds;
    let item = new Paper.Path.Rectangle(bbox);
    item.name = name;
    return item;
  }
}

export default GraphicText;
