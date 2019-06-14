import Paper from "paper";
import { Machine, StateValue } from "xstate";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemMetaData";
import configuration from "../../common/configuration";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import deepClone from "../../common/deepClone";

const textMachine = Machine({
  id: "text",
  initial: "idle",
  states: {
    idle: {
      on: {
        mouseDown: "edit",
      },
    },
    edit: {
      on: {
        reset: "idle",
        mouseDown: "editText",
      },
    },
    editText: {
      on: {
        reset: "idle",
        editTextFinished: "edit",
      },
    },
  },
});

class GraphicText extends Placement {
  pt: Paper.Point;
  text: string;
  fontFamily: string = "Arial";
  fontSize: number = 48;

  _boundingBox: Paper.Item | null = null;
  _currentState: StateValue = "";

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

  _setMode(drawMode: DrawMode) {
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

    console.log("paperDraw");
    item.onMouseEnter = this.onMouseEnter.bind(this);
    item.onMouseLeave = this.onMouseLeave.bind(this);
    item.onMouseDown = this.onMouseDown.bind(this);

    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  private onMouseEnter() {
    this.showHoverBoundingBox();
  }
  private onMouseLeave() {
    this.hideBoundingBox();
  }

  private showHoverBoundingBox() {
    const item = this.createBoundingRect("");
    item.strokeColor = configuration.itemHoverStrokeColor;
    item.strokeWidth = configuration.hoverStrokeWidth;
    if (this._boundingBox) {
      this._boundingBox.replaceWith(item);
    } else {
      this._boundingBox = item;
    }
  }

  private hideBoundingBox() {
    if (this._boundingBox) {
      this._boundingBox.remove();
      this._boundingBox = null;
    }
  }

  private onMouseDown(event: Paper.MouseEvent) {
    this.switchState("mouseDown");
  }

  public switchState(newState: string) {
    this._currentState = textMachine.transition(
      this._currentState,
      newState,
    ).value;

    switch (this._currentState) {
      case "edit":
        {
          this.removeTempItems();
          const item = this.createBoundingRect(ItemName.temp);
          item.strokeColor = configuration.modeSelectColor;
          this._tempItems.push(item);
        }
        break;

      case "editText":
        {
          this.removeTempItems();
          this.startEditText();
          this._item.remove();
        }
        break;

      case "idle":
        {
          this.paperDraw();
        }
        break;
    }
  }

  private removeTempItems() {
    if (this._tempItems) {
      for (let item of this._tempItems) {
        item.remove();
      }
    }
    this._tempItems = [];
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

  private drawTempItems() {
    // if (this._tempItems) {
    //   for (let item of this._tempItems) {
    //     item.remove();
    //   }
    // }
    // appEventDispatcher.dispatch("showEditText", {
    //   show: false,
    // });
    // this._tempItems = [];
    // switch (this._drawMode) {
    //   case "select":
    //     {
    //       const item = this.createBoundingRect(ItemName.temp);
    //       item.strokeColor = configuration.modeSelectColor;
    //       this._tempItems.push(item);
    //     }
    //     break;
    //   case "edit":
    //     {
    //       const item = this.createBoundingRect(ItemName.temp);
    //       item.strokeColor = configuration.modeSelectColor;
    //       // item.fillColor = "#2e2e2e11";
    //       this._tempItems.push(item);
    //       item.onMouseDown = this.startEditText.bind(this);
    //     }
    //     break;
    // }
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
