import Point from "../../common/point";
import Line from "../../common/line";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement, { DrawOptions } from "../Placement";
import GraphicGrip from "./GraphicGrip";
import Paper, { Item } from "paper";

class GraphicLine extends Placement {
  constructor(public p1: Paper.Point, public p2: Paper.Point) {
    super("line");
  }

  static fromJSON(json: any): GraphicLine {
    // const line = Object.create(GraphicLine.prototype);
    // return (<any>Object).assign(line, json, {
    //   p1: Point.fromJSON(json.p1),
    //   p2: Point.fromJSON(json.p2),
    // });
    return new GraphicLine(
      new Paper.Point(1, 2),
      new Paper.Point(3, 4),
    );
  }

  // pickable(): boolean {
  //   return this.layer !== "autoconnect";
  // }

  // nearPoint(pt: Point, radius: number): boolean {
  //   const line = new Line(this.p1, this.p2);
  //   return line.nearPoint(pt, radius);
  // }

  // insideBox(box: Box): boolean {
  //   const line = new Line(this.p1, this.p2);
  //   return box.isLineInside(line);
  // }

  paperDraw(): Paper.Item {
    const line = new Paper.Path.Line(
      new Paper.Point(this.p1.x, this.p1.y),
      new Paper.Point(this.p2.x, this.p2.y),
    );
    this.paperSetStyle(line);
    return line;
  }

  // draw(
  //   context: CanvasRenderingContext2D,
  //   transform: TransformCoordinate,
  //   options: DrawOptions,
  // ): void {
  //   context.save();
  //   this.drawWithOptions(context, options);
  //   context.beginPath();
  //   if (this.layer === "autoconnect") {
  //     context.strokeStyle = "#e11";
  //   }
  //   const p1 = transform.wcToCanvas(this.p1);
  //   context.moveTo(p1.x, p1.y);
  //   const p2 = transform.wcToCanvas(this.p2);
  //   context.lineTo(p2.x, p2.y);
  //   context.stroke();
  //   context.restore();
  // }

  // getGrips(): GraphicGrip[] {
  //   const g1 = new GraphicGrip(this.p1, this, 1);
  //   const g2 = new GraphicGrip(this.p2, this, 2);
  //   return [g1, g2];
  // }

  // gripChanged(pt: Point, payload: any): Placement {
  //   const line = deepClone(this);
  //   if (payload === 1) {
  //     line.p1 = pt;
  //   } else {
  //     line.p2 = pt;
  //   }

  //   return line;
  // }

  translate(pt: Paper.Point) {
    const line: GraphicLine = deepClone(this);
    line.p1 = line.p1.add(pt);
    line.p2 = line.p2.add(pt);
    return line;
  }

  // getBoundingBox(): Box {
  //   return new Box(this.p1, this.p2);
  // }
}

export default GraphicLine;
