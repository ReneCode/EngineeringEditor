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
      context.setLineDash([5, 5]);
      item.draw(context, transform, { selected: true });
      context.restore();
    });

    this.drawCursor(context, transform);
  };

  snapGrid(pt) {
    return pt;
    // const useGrid = true;
    // if (useGrid) {
    // snap to grid
    // return pt.snap(canvas.gridX, canvas.gridY);
    // }
  }

  drawCursor(context, transform) {
    const cursor = this.props.graphic.cursor;
    const pt = this.snapGrid(cursor.pt);
    const r = cursor.radiusScreen;

    context.save();
    context.beginPath();
    context.strokeStyle = "rgba(0,0,0,0.3)";
    if (cursor.mode === "select") {
      context.fillStyle = "rgba(68,68,85,0.2)";
      context.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
    }
    context.moveTo(pt.x - r * 3, pt.y);
    context.lineTo(pt.x + r * 3, pt.y);
    context.moveTo(pt.x, pt.y - r * 3);
    context.lineTo(pt.x, pt.y + r * 3);
    context.fill();
    context.stroke();
    context.restore();
  }

  render() {
    return null;
  }
}
export default DrawCanvas;
