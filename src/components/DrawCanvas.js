import { Component } from "react";

import ItemTypes from "../model/ItemTypes";

class DrawCanvas extends Component {
  draw = transform => {
    const canvas = this.props.getCanvas();
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    // grid
    // this.drawGrid(context, canvas);

    // items
    this.props.graphic.items.forEach(item => {
      context.beginPath();
      this.drawItem(context, transform, item);
      context.stroke();
    });

    // dynamic items
    this.props.graphic.dynamicItems.forEach(item => {
      context.beginPath();
      this.drawItem(context, transform, item);
      context.stroke();
    });
  };

  drawGrid(context, canvas) {
    // https://hacks.mozilla.org/2009/06/pushing-pixels-with-canvas/
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
    context.putImageData(canvasData, 0, 0);
  }

  drawItem(context, transform, item) {
    switch (item.type) {
      case ItemTypes.line:
        context.lineWidth = 1;
        const p1 = transform.wcToCanvas(item.p1);
        context.moveTo(p1.x, p1.y);
        const p2 = transform.wcToCanvas(item.p2);
        context.lineTo(p2.x, p2.y);
        break;

      case ItemTypes.circle:
        const pt = transform.wcToCanvas(item.pt);
        const r = transform.wcLengthToCanvas(item.radius);
        context.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
        break;

      case ItemTypes.rect:
        {
          const p1 = transform.wcToCanvas(item.p1);
          const p2 = transform.wcToCanvas(item.p2);
          // x, y, width, height
          context.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
          context.stroke();
        }
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
