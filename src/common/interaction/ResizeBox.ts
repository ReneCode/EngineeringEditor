import Paper, { Path, Point } from "paper";
import configuration from "../configuration";

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

  static create(item: Paper.Item) {
    if (!symbolHandle) {
      symbolHandle = createSymbolHandle();
    }

    const items = [];
    const rect = new Paper.Path.Rectangle(
      item.bounds.topLeft,
      item.bounds.bottomRight,
    );
    rect.name = "bbox";
    items.push(rect);
    rect.strokeColor = configuration.boundingBoxStrokeColor;
    [
      rect.bounds.topLeft,
      rect.bounds.topRight,
      rect.bounds.bottomRight,
      rect.bounds.bottomLeft,
    ].forEach((point: Paper.Point) => {
      // const handle = new Paper.PlacedSymbol(
      //   symbolHandle as Paper.Symbol,
      //   point,
      // );
      const handle = new Paper.Path.Rectangle(
        new Paper.Rectangle(
          point.subtract(configuration.boundingBoxHandleSize / 2),
          point.add(configuration.boundingBoxHandleSize / 2),
        ),
      );
      handle.strokeColor = configuration.handleStrokeColor;
      handle.fillColor = configuration.handleFillColor;
      handle.name = "handle";

      items.push(handle);
    });

    const group = new Paper.Group(items);
    return group;
  }
}

export default ResizeBox;
