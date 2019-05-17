import Paper from "paper";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";
import Box from "../../common/box";
import Placement from "../Placement";

// https://www.cadlinecommunity.co.uk/hc/en-us/articles/360000136085-AutoCAD-Electrical-2018-Schematic-Symbol-Wire-Connection-Attributes
export enum ConnectionPointDirection {
  RIGHT = 1,
  UP = 2,
  LEFT = 4,
  DOWN = 8,
}

const RADIUS_CANVAS = 5;

class GraphicConnectionPoint extends Placement {
  direction: ConnectionPointDirection = ConnectionPointDirection.DOWN;
  index: number;

  constructor(public pt: Paper.Point) {
    super("connectionpoint");
    this.index = 0;
  }
  /*
  static fromJSON(json: any): GraphicConnectionPoint {
    const connectionPoint = Object.create(
      GraphicConnectionPoint.prototype,
    );
    return (<any>Object).assign(connectionPoint, json, {
      pt: Point.fromJSON(json.pt),
    });
  }

  nearPoint(pt: Point, radius: number): boolean {
    return this.pt.sub(pt).length() <= radius;
  }

  insideBox(box: Box): boolean {
    return box.isPointInside(this.pt);
  }

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    context.beginPath();
    context.fillStyle = "rgba(50,100,50,0.4)";
    const pt = transform.wcToCanvas(this.pt);
    const r = RADIUS_CANVAS;
    context.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.beginPath();
    const oldStokeStyle = context.strokeStyle;
    context.strokeStyle = "rgba(250,20,20,0.6)";
    // direction
    const dirLen = 15;
    context.moveTo(pt.x, pt.y);
    const p2 = pt;
    switch (this.direction) {
      case ConnectionPointDirection.UP:
        p2.y -= dirLen;
        break;
      case ConnectionPointDirection.DOWN:
        p2.y += dirLen;
        break;
      case ConnectionPointDirection.RIGHT:
        p2.x += dirLen;
        break;
      case ConnectionPointDirection.LEFT:
        p2.x -= dirLen;
        break;
    }
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.strokeStyle = oldStokeStyle;
  }

  translate(pt: Paper.Point): GraphicConnectionPoint {
    const connectionPoint = deepClone(this);
    connectionPoint.pt = connectionPoint.pt.add(pt);
    return connectionPoint;
  }

  getBoundingBox(): Box {
    return new Box(this.pt, this.pt);
  }
  */
}

export default GraphicConnectionPoint;
