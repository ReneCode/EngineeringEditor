import Paper, { Path, Point } from "paper";
import configuration from "../configuration";
import { ItemName } from "../ItemMetaData";
import correctP2WithRatio from "../../utils/correctP2WithRatio";

// let symbolHandle: Paper.Symbol | null = null;

// const createSymbolHandle = () => {
//   const symbol = new Paper.Symbol(
//     new Paper.Path.Rectangle(
//       new Paper.Rectangle(
//         new Paper.Point(
//           (-1 * configuration.boundingBoxHandleSize) / 2,
//           (-1 * configuration.boundingBoxHandleSize) / 2,
//         ),
//         new Paper.Size(
//           configuration.boundingBoxHandleSize,
//           configuration.boundingBoxHandleSize,
//         ),
//       ),
//     ),
//   );
//   return symbol;
// };

class ResizeBox {
  private group: Paper.Group | null = null;
  private handles: Paper.Item[] = [];
  private rect: Paper.Item | null = null;
  startBoundingBox: Paper.Rectangle | null = null;
  private ratio: number = 0; // width / height

  public create(paperItems: Paper.Item[]) {
    this.remove();
    if (paperItems.length === 0) {
      return;
    }

    // calc bounding box
    const group = new Paper.Group();
    group.addChildren(paperItems);
    const bbox = group.bounds;
    this.ratio = bbox.width / bbox.height;
    this.startBoundingBox = group.bounds;

    this.rect = new Paper.Path.Rectangle(bbox);
    this.rect.name = ItemName.resizeBox;
    const items: Paper.Item[] = [];
    items.push(this.rect);
    this.rect.strokeColor = configuration.boundingBoxStrokeColor;
    [
      bbox.topRight,
      bbox.bottomRight,
      bbox.bottomLeft,
      bbox.topLeft,
    ].forEach((point: Paper.Point, index: number) => {
      const handle = new Paper.Path.Rectangle(
        new Paper.Rectangle(
          point.subtract(configuration.boundingBoxHandleSize / 2),
          point.add(configuration.boundingBoxHandleSize / 2),
        ),
      );
      handle.strokeColor = configuration.handleStrokeColor;
      handle.fillColor = configuration.handleFillColor;
      handle.name = ItemName.resizeHandle;
      handle.data = { index: index };
      this.handles.push(handle);
      items.push(handle);
    });

    this.group = new Paper.Group(items);
  }

  public remove() {
    if (this.group) {
      this.group.remove();
      this.handles = [];
      this.group = null;
      this.rect = null;
    }
  }

  public move(delta: Paper.Point) {
    if (this.group) {
      this.group.position = this.group.position.add(delta);
    }
  }

  public moveHandle(
    handle: Paper.Item,
    pos: Paper.Point,
    keepRatio: boolean,
  ) {
    const index = this.handles.findIndex(h => h === handle);
    let newHandlePosition = pos;
    if (keepRatio) {
      const oppositeHandle = this.handles[
        this.getOppositeHandleIndex(index)
      ];
      newHandlePosition = correctP2WithRatio(
        oppositeHandle.position,
        newHandlePosition,
        this.ratio,
      );
    }
    handle.position = newHandlePosition;
    this.updateOtherHandles(index);

    // update rect
    const newRect = new Paper.Path.Rectangle(
      this.handles[3].position,
      this.handles[1].position,
    );
    newRect.name = ItemName.resizeBox;
    newRect.strokeColor = configuration.boundingBoxStrokeColor;
    if (this.rect) {
      this.rect.replaceWith(newRect);
    }
    this.rect = newRect;
  }

  getCenter(): Paper.Point {
    const newRect = new Paper.Rectangle(
      this.handles[0].position,
      this.handles[2].position,
    );
    return newRect.center;
  }

  getStartBoundingBox(): Paper.Rectangle {
    return this.startBoundingBox as Paper.Rectangle;
  }
  getSize(): Paper.Point {
    return this.handles[2].position.subtract(
      this.handles[0].position,
    );
  }

  public getHandles() {
    return this.handles;
  }

  public replaceItemWith(item: Paper.Item) {
    this.handles.forEach((h, idx) => {
      ResizeBox.setHandleData(h, idx);
    });
  }

  private getOppositeHandleIndex(index: number): number {
    switch (index) {
      case 0:
        return 2;
      case 1:
        return 3;
      case 2:
        return 0;
      case 3:
        return 1;
      default:
        throw new Error("bad index");
    }
  }

  private static setHandleData(handle: Paper.Item, index: number) {
    handle.data = { index: index };
  }

  private updateOtherHandles(changedIndex: number) {
    switch (changedIndex) {
      case 0: // topRight
        this.updateOtherHandle(1);
        this.updateOtherHandle(3);
        break;
      case 1: // bottomRight
        this.updateOtherHandle(0);
        this.updateOtherHandle(2);
        break;
      case 2: // bottomLeft
        this.updateOtherHandle(1);
        this.updateOtherHandle(3);
        break;
      case 3: // topLeft
        this.updateOtherHandle(0);
        this.updateOtherHandle(2);
        break;
    }
  }

  private updateOtherHandle(index: number) {
    let newPos: Paper.Point = new Paper.Point(1, 1);
    switch (index) {
      case 0: // topRight
        newPos = new Paper.Point(
          this.handles[1].position.x,
          this.handles[3].position.y,
        );
        break;
      case 1: // bottomRight
        newPos = new Paper.Point(
          this.handles[0].position.x,
          this.handles[2].position.y,
        );
        break;
      case 2: // bottomLeft
        newPos = new Paper.Point(
          this.handles[3].position.x,
          this.handles[1].position.y,
        );
        break;
      case 3: // topLeft
        newPos = new Paper.Point(
          this.handles[2].position.x,
          this.handles[0].position.y,
        );
        break;
      default:
        throw new Error("ilegal index");
    }
    this.handles[index].position = newPos;
  }
}

export default ResizeBox;
