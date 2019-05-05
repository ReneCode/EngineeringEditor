import Paper, { Path, Point } from "paper";
import configuration from "../configuration";
import { ItemName } from "../ItemMetaData";

let symbolHandle: Paper.Symbol | null = null;

const createSymbolHandle = () => {
  const symbol = new Paper.Symbol(
    new Paper.Path.Rectangle(
      new Paper.Rectangle(
        new Paper.Point(
          (-1 * configuration.boundingBoxHandleSize) / 2,
          (-1 * configuration.boundingBoxHandleSize) / 2,
        ),
        new Paper.Size(
          configuration.boundingBoxHandleSize,
          configuration.boundingBoxHandleSize,
        ),
      ),
    ),
  );
  return symbol;
};

class ResizeBox {
  private group: Paper.Group;
  private handles: Paper.Item[] = [];
  private rect: Paper.Item = new Paper.Item();

  public constructor(private item: Paper.Item) {
    symbolHandle = createSymbolHandle();

    const items = [];
    this.rect = new Paper.Path.Rectangle(
      item.bounds.topLeft,
      item.bounds.bottomRight,
    );
    this.rect.name = ItemName.resizeBox;
    items.push(this.rect);
    this.rect.strokeColor = configuration.boundingBoxStrokeColor;
    [
      this.rect.bounds.topRight,
      this.rect.bounds.bottomRight,
      this.rect.bounds.bottomLeft,
      this.rect.bounds.topLeft,
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
      handle.data = { item: item, index: index };
      this.handles.push(handle);

      items.push(handle);
    });

    this.group = new Paper.Group(items);
  }

  public remove() {
    this.group.remove();
  }
  public move(delta: Paper.Point) {
    this.group.position = this.group.position.add(delta);
  }

  public moveHandle(index: number, delta: Paper.Point) {
    const handle = this.handles[index];
    handle.position = handle.position.add(delta);
    this.updateOtherHandles(index);
    this.updateRect();
  }

  public static getSymbolHandle() {
    if (!symbolHandle) {
      symbolHandle = createSymbolHandle();
    }
  }

  private updateRect() {
    const newRect = new Paper.Path.Rectangle(
      this.handles[3].position,
      this.handles[1].position,
    );
    newRect.name = ItemName.resizeBox;
    newRect.strokeColor = configuration.boundingBoxStrokeColor;
    this.rect.remove();
    this.rect = newRect;
    this.group.insertChild(0, newRect);
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
