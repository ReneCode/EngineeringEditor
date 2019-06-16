import { IdType, GraphicType, LayerType } from "./types";
import Paper from "paper";
import createId from "./createId";
import deepClone from "../common/deepClone";

export type DrawMode = "highlight" | "select" | null;

class Placement {
  type: GraphicType;
  id: IdType;
  pageId: IdType;
  projectId: IdType;
  color: string | undefined;
  fill: string | undefined;
  layer: LayerType = undefined;

  protected _grips: Paper.Item[] = [];
  protected _item: Paper.Item = new Paper.Item();
  protected _drawMode: DrawMode = null;
  protected _tempItems: Paper.Item[];

  constructor(type: GraphicType) {
    this.type = type;
    this.id = createId("P");
    this._tempItems = [];
  }

  toJSON(): any {
    return {
      type: this.type,
      id: this.id,
      pageId: this.pageId,
      projectId: this.projectId,
      color: this.color,
      fill: this.fill,
      layer: this.layer,
    };
  }

  clone(): Placement {
    return deepClone(this);
  }

  setPaperItem(item: Paper.Item) {
    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
  }
  getPaperItem(): Paper.Item {
    return this._item;
  }

  protected removeTempItems() {
    if (this._tempItems) {
      for (let item of this._tempItems) {
        item.remove();
      }
    }
    this._tempItems = [];
  }

  protected addTempItem(item: Paper.Item) {
    if (!this._tempItems) {
      this._tempItems = [];
    }
    this._tempItems.push(item);
  }

  setMode(newMode: DrawMode) {
    // throw new Error(`overwrite setMode on object: ${this}`);
  }

  createPaperItem(): Paper.Item {
    return new Paper.Item();
  }

  paperDraw(): Paper.Item | null {
    return null;
  }

  translate(event: Paper.Point) {
    throw new Error("translate has to be overwritten by:" + this);
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    throw new Error("dragGrip has to be overwritten by:" + this);
  }

  dragItem(event: Paper.MouseEvent) {
    throw new Error("dragItem has to be overwritten by:" + this);
  }
}

export default Placement;
