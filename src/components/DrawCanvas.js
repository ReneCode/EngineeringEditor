import { Component } from "react";

import ItemTypes from "../model/ItemTypes";

class DrawCanvas extends Component {
  draw = () => {
    const canvas = this.props.getCanvas();
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    // grid
    this.drawGrid(context, canvas);

    // items
    this.props.graphic.items.forEach(item => {
      context.beginPath();
      this.drawItem(context, item);
      context.stroke();
    });

    // dynamic items
    this.props.graphic.dynamicItems.forEach(item => {
      context.beginPath();
      this.drawItem(context, item);
      context.stroke();
    });
  };

  drawGrid(context, canvas) {
    const gridX = 20;
    const gridY = 20;
    let canvasData = context.createImageData(
      canvas.width,
      canvas.height,
    );
    const r = 0;
    const g = 0;
    const b = 0;
    const a = 200;
    const ch = canvas.height;
    for (let x = 0; x < canvas.width; x += gridX) {
      for (let y = 0; y < canvas.height; y += gridY) {
        let idx = (x + (ch - y) * canvas.width) * 4;
        canvasData.data[idx + 0] = r;
        canvasData.data[idx + 1] = g;
        canvasData.data[idx + 2] = b;
        canvasData.data[idx + 3] = a;
      }
    }
    console.log("grid");
    context.putImageData(canvasData, 0, 0);
    // context.drawImage(canvasData, 0, 0);
  }

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
