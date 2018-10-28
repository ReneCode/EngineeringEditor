import { Component } from "react";

import ItemTypes from "../model/ItemTypes";
import Point from "../common/Point";

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
    const translate = new Point(
      this.props.graphic.cursor.x,
      this.props.graphic.cursor.y,
    );
    this.props.graphic.dynamicItems.forEach(item => {
      this.context.beginPath();
      const newItem = item.translate(translate);
      this.drawItem(this.context, newItem);
      this.context.stroke();
    });
  };

  drawItem(context, item) {
    switch (item.type) {
      case ItemTypes.line:
        context.lineWidth = 1;
        context.moveTo(item.x1, item.y1);
        context.lineTo(item.x2, item.y2);
        break;

      case ItemTypes.circle: {
        context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
        break;
      }
    }
  }

  render() {
    return null;
  }
}
export default DrawCanvas;
