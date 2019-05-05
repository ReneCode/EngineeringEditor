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
  group: Paper.Group | null = null;

  public static getSymbolHandle() {
    if (!symbolHandle) {
      symbolHandle = createSymbolHandle();
    }
  }

  static create(item: Paper.Item) {
    symbolHandle = createSymbolHandle();

    const items = [];
    const rect = new Paper.Path.Rectangle(
      item.bounds.topLeft,
      item.bounds.bottomRight,
    );
    rect.name = ItemName.resizeBox;
    items.push(rect);
    rect.strokeColor = configuration.boundingBoxStrokeColor;
    [
      rect.bounds.topLeft,
      rect.bounds.topRight,
      rect.bounds.bottomRight,
      rect.bounds.bottomLeft,
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

      items.push(handle);
    });

    const group = new Paper.Group(items);
    return group;
  }
}

export default ResizeBox;
