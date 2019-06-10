import { IdType, GraphicType, LayerType } from "./types";
import Paper from "paper";
import createId from "./createId";

export type DrawOptions = {
  mode?: "selected" | "temp";
  parent?: any;
};

export type DrawMode = "select" | "edit" | null;

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

  getPaperItem(): Paper.Item {
    return this._item;
  }

  setMode(newMode: DrawMode) {
    throw new Error(`overwrite setMode on object: ${this}`);
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

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {}

  dragItem(event: Paper.MouseEvent) {}
}

export default Placement;
