import Paper from "paper";
import { Machine, StateValue } from "xstate";
import Placement, { DrawMode } from "../Placement";
import PaperUtil, { TRANSPARENT_COLOR } from "../../utils/PaperUtil";
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
        mouseEnter: "hover",
      },
    },
    hover: {
      on: {
        mouseLeave: "idle",
        mouseDown: "edit",
      },
    },
    edit: {
      on: {
        reset: "idle",
        mouseUp: "editText",
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

  _currentState: StateValue = textMachine.initialState.value;

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

  setMode(drawMode: DrawMode) {
    if (!drawMode) {
      this.transition("reset");
    }
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

    item.onMouseEnter = () => {
      this.transition("mouseEnter");
    };
    item.onMouseLeave = () => {
      this.transition("mouseLeave");
    };
    item.onMouseDown = () => {
      this.transition("mouseDown");
    };
    item.onMouseUp = () => {
      this.transition("mouseUp");
    };

    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  private showHoverBoundingBox() {
    const item = this.createBoundingRect("");
    item.strokeColor = configuration.itemHoverStrokeColor;
    item.strokeWidth = configuration.hoverStrokeWidth;
    this.addTempItem(item);
  }

  private hideBoundingBox() {
    this.removeTempItems();
  }

  public transition(event: string) {
    const oldState = this._currentState;
    this._currentState = textMachine.transition(
      this._currentState,
      event,
    ).value;
    console.log(
      "transition:",
      event,
      oldState,
      "=>",
      this._currentState,
    );
    if (oldState === this._currentState) {
      return;
    }

    switch (this._currentState) {
      case "hover":
        this.showHoverBoundingBox();
        break;
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
          // it has to be selectable - but not visible => transparent
          this._item.fillColor = TRANSPARENT_COLOR;
        }
        break;

      case "idle":
        this.hideBoundingBox();
        // this.paperDraw();
        break;
    }
  }

  createPaperItem(): Paper.Item {
    console.log("%c createPaperItem", "color: orange;");
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
