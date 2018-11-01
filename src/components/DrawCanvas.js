import { Component } from "react";

class DrawCanvas extends Component {
  draw = transform => {
    const canvas = this.props.getCanvas();
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    // grid
    // this.drawGrid(context, canvas);

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

  render() {
    return null;
  }
}
export default DrawCanvas;
