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

  toJsonContent(): string {
    return this.toJSON();
  }

  getPaperItem(): Paper.Item | null {
    return this._item;
  }

  setMode(newMode: DrawMode) {
    throw new Error(`overwrite setMode on object: ${this}`);
  }

  setSelected(on: boolean) {
    console.log("select:", on, this.id);

    if (this._item) {
      this._item.selected = on;
    }
  }

  createPaperItem(): Paper.Item {
    return new Paper.Item();
  }

  paperDraw(): Paper.Item | null {
    return null;
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
    option: DrawOptions = {},
  ) {
    throw new Error("draw has to be overwritten by:" + this);
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {}

  dragItem(event: Paper.MouseEvent) {}

  getGrips(): Paper.Item[] {
    return this._grips;
  }

  gripChanged(pt: Point, payload: any): Placement {
    return this;
  }

  pickable(): boolean {
    return true;
  }

  nearPoint(pt: Point, radius: number): boolean {
    throw new Error("nearPoint has to be overwritten by:" + this);
  }

  insideBox(box: Box): boolean {
    throw new Error("insideBox has to be overwritten by:" + this);
  }

  translate(event: Paper.Point) {
    throw new Error("translate has to be overwritten by:" + this);
  }

  fitToRect(rectangle: Paper.Rectangle): Placement {
    throw new Error("fitToRect has to be overwritten by:" + this);
  }

  updateFromHandles(handles: Paper.Item[]): Placement {
    throw new Error(
      "updateFromHandles has to be overwritten by:" + this,
    );
  }

  changeAfterResize(points: Point[]): Placement {
    throw new Error(
      "changeAfterResize has to be overwritten by:" + this,
    );
  }

  getBoundingBox(): Box {
    throw new Error(
      "getBoundingBox has to be overwritten by:" + this,
    );
  }

  protected drawWithOptions(
    context: CanvasRenderingContext2D,
    options: DrawOptions,
  ) {
    if (this.color) {
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
    }
    if (options) {
      if (options.mode === "selected") {
        context.setLineDash([3, 3]);
      }
    }
  }

  // translate(pt: Point) {
  //   const placement = new Placement(
  //     this.projectId,
  //     this.pageId,
  //     this.graphic.translate(pt),
  //   );
  //   placement.id = this.id;
  //   return placement;
  // }
}

export default Placement;
