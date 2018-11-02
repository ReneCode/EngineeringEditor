import { Component } from "react";

class DrawCanvas extends Component {
  draw = transform => {
    const canvas = this.props.getCanvas();
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const items = this.props.graphic.items;
    const dynamicItems = this.props.graphic.dynamicItems;
    // items
    items.forEach(item => {
      if (!dynamicItems.includes(item)) {
        item.draw(context, transform);
      }
    });

    // dynamic items
    dynamicItems.forEach(item => {
      context.save();
      context.setLineDash([10, 10]);
      item.draw(context, transform, { selected: true });
      context.restore();
    });

    this.drawCursor(context, canvas);
  };

  drawCursor(context, canvas) {}

  render() {
    return null;
  }
}
export default DrawCanvas;
