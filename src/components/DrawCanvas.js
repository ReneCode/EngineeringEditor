import { Component } from "react";

import ItemTypes from "../model/ItemTypes";

class DrawCanvas extends Component {
  draw = () => {
    const canvas = this.props.getCanvas();
    this.context = canvas.getContext("2d");

    this.context.clearRect(0, 0, canvas.width, canvas.height);

    // items
    this.props.graphic.items.forEach(item => {
      this.context.beginPath();
      this.drawItem(this.context, item);
      this.context.stroke();
    });

    // dynamic items
    this.props.graphic.dynamicItems.forEach(item => {
      this.context.beginPath();
      this.drawItem(this.context, item);
      this.context.stroke();
    });
  };

  drawItem(context, item) {
    const ch = this.props.getCanvas().height;

    switch (item.type) {
      case ItemTypes.line:
        context.lineWidth = 1;
        context.moveTo(item.p1.x, ch - item.p1.y);
        context.lineTo(item.p2.x, ch - item.p2.y);
        break;

      case ItemTypes.circle:
        context.arc(
          item.pt.x,
          ch - item.pt.y,
          item.radius,
          0,
          2 * Math.PI,
        );
        break;

      default:
        throw new Error(`bad item type: ${item.typep}`);
    }
  }

  render() {
    return null;
  }
}
export default DrawCanvas;
