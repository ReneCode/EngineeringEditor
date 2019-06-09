import { IdType, GraphicType, LayerType } from "./types";
import TransformCoordinate from "../common/transformCoordinate";
import Point from "../common/point";
import Paper from "paper";
import Box from "../common/box";
import createId from "./createId";

export type DrawOptions = {
  mode?: "selected" | "temp";
  parent?: any;
};

export type DrawMode = "select" | "edit" | "hover" | null;

class Placement {
  type: GraphicType;
  id: IdType;
  pageId: IdType;
  projectId: IdType;
  color: string | undefined;
  fill: string | undefined;
  layer: LayerType = undefined;

  protected _grips: Paper.Item[] = [];
  protected _item: Paper.Item | null = null;
  protected _drawMode: DrawMode = null;
  protected _tempItems: Paper.Item[] = [];

  constructor(type: GraphicType) {
    this.type = type;
    this.id = createId("P");
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

  // toJsonContent(): string {
  //   return this.toJSON();
  // }

  getPaperItem(): Paper.Item | null {
    return this._item;
  }

  setMode(newMode: DrawMode) {
    throw new Error(`overwrite setMode on object: ${this}`);
  }

  // setSelected(on: boolean) {
  //   console.log("select:", on, this.id);

  //   if (this._item) {
  //     this._item.selected = on;
  //   }
  // }

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

  getGrips(): Paper.Item[] {
    return this._grips;
  }

  gripChanged(pt: Point, payload: any): Placement {
    return this;
  }
}

export default Placement;
