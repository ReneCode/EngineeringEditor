import Point from "../../common/point";
import GraphicBase from "./GraphicBase";
import TransformCoordinate from "../../common/transformCoordinate";
import deepClone from "../../common/deepClone";

// https://www.cadlinecommunity.co.uk/hc/en-us/articles/360000136085-AutoCAD-Electrical-2018-Schematic-Symbol-Wire-Connection-Attributes
export enum ConnectionPointDirection {
  RIGHT = 1,
  UP = 2,
  LEFT = 4,
  DOWN = 8,
}

class GraphicConnectionPoint extends GraphicBase {
  pt: Point;
  direction: ConnectionPointDirection = ConnectionPointDirection.DOWN;

  constructor(pt: Point) {
    super("connectionpoint");
    this.pt = pt || new Point(0, 0);
  }

  toJSON(): object {
    const result = (<any>Object).assign({}, this, {
      pt: this.pt.toJSON(),
    });
    return result;
  }

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

  draw(
    context: CanvasRenderingContext2D,
    transform: TransformCoordinate,
  ): void {
    context.beginPath();
    context.fillStyle = "rgba(50,100,50,0.4)";
    const pt = transform.wcToCanvas(this.pt);
    const r = 5;
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

  translate(pt: Point): GraphicConnectionPoint {
    const connectionPoint = deepClone(this);
    connectionPoint.pt = connectionPoint.pt.add(pt);
    return connectionPoint;
  }
}

export default GraphicConnectionPoint;
