import Paper from "paper";
import Placement, { DrawMode } from "../Placement";
import PaperUtil from "../../utils/PaperUtil";
import configuration from "../../common/configuration";
import { ItemName } from "../../common/ItemName";

// https://www.cadlinecommunity.co.uk/hc/en-us/articles/360000136085-AutoCAD-Electrical-2018-Schematic-Symbol-Wire-Connection-Attributes
export enum ConnectionPointDirection {
  RIGHT = 1,
  UP = 2,
  LEFT = 4,
  DOWN = 8,
}

class GraphicConnectionPoint extends Placement {
  public direction: ConnectionPointDirection =
    ConnectionPointDirection.DOWN;
  public index: number;
  public pt: Paper.Point;

  constructor(pt: Paper.Point) {
    super("connectionpoint");
    this.pt = pt;
    this.index = 0;
  }

  static fromJSON(json: any): GraphicConnectionPoint {
    const connectionPoint = Object.create(
      GraphicConnectionPoint.prototype,
    );
    return Object.assign(connectionPoint, json, {
      pt: PaperUtil.PointFromJSON(json.pt),
      direction: json.direction,
      index: json.index,
    });
  }

  public toJSON(): any {
    return {
      ...super.toJSON(),
      pt: PaperUtil.PointToJSON(this.pt),
      direction: this.direction,
      index: this.index,
    };
  }

  public paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
      case undefined:
        this.removeTempItems();
        this.setPaperItem(this.createPaperItem());
        break;

      case "highlight":
      case "select":
        this.removeTempItems();
        const circle = this.createCircle();
        circle.strokeColor = configuration.modeHighlightColor;
        this.addTempItem(circle);
        break;

      default:
        throw new Error("bad drawMode:" + drawMode);
    }
    return this.getPaperItem();
  }

  public translate(delta: Paper.Point) {
    this.pt = this.pt.add(delta);
  }

  public rotate() {
    let newDirection: ConnectionPointDirection;
    switch (this.direction) {
      case ConnectionPointDirection.UP:
        newDirection = ConnectionPointDirection.LEFT;
        break;
      case ConnectionPointDirection.LEFT:
        newDirection = ConnectionPointDirection.DOWN;
        break;
      case ConnectionPointDirection.DOWN:
        newDirection = ConnectionPointDirection.RIGHT;
        break;
      case ConnectionPointDirection.RIGHT:
        newDirection = ConnectionPointDirection.UP;
        break;
      default:
        newDirection = this.direction;
    }
    this.direction = newDirection;
  }

  private createCircle(): Paper.Item {
    const r = PaperUtil.lengthViewToProject(
      configuration.connectionPointRadius,
    );

    const circle = new Paper.Path.Circle(this.pt, r);
    return circle;
  }

  private createPaperItem(): Paper.Item {
    const circle = this.createCircle();
    circle.fillColor = configuration.connectionPointFillColor;
    circle.strokeColor = configuration.connectionPointStrokeColor;

    // direction
    const dirLen = PaperUtil.lengthViewToProject(
      configuration.connectionPointDirectionLength,
    );
    const p1 = this.pt;
    const p2 = this.pt.clone();
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
    const line = new Paper.Path.Line(p1, p2);
    line.strokeColor =
      configuration.connectionPointDirectionStrokeColor;

    const group = new Paper.Group([circle, line]);
    group.data = this.id;
    group.name = ItemName.itemGroup;

    return group;
  }
}

export default GraphicConnectionPoint;
