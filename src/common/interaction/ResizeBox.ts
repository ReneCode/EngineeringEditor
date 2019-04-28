import Paper, { Path } from "paper";
import configuration from "../configuration";

class ResizeBox {
  group: Paper.Group | null = null;

  static create(item: Paper.Item) {
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
      const handle = new Paper.Path.Rectangle(
        new Paper.Rectangle(
          point.subtract(configuration.boundingBoxHandleSize / 2),
          point.add(configuration.boundingBoxHandleSize / 2),
        ),
      );
      handle.strokeColor = configuration.handleStrokeColor;
      handle.fillColor = configuration.handleFillColor;
      handle.name = "bbox";

      items.push(handle);
    });

    const group = new Paper.Group(items);
    return group;
  }
}

export default ResizeBox;
