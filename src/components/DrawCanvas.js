import { Component } from "react";

class DrawCanvas extends Component {
  draw = transform => {
    const canvas = this.props.getCanvas();
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const items = this.props.graphic.items;
    const selectedItems = this.props.graphic.selectedItems;
    const tempItems = this.props.graphic.tempItems;

    // only draw such itmes that are NOT in the selected list
    items.forEach(item => {
      if (!selectedItems.find(i => i.id === item.id)) {
        item.draw(context, transform);
      }
    });

    // selected items
    selectedItems.forEach(item => {
      context.save();
      context.setLineDash([5, 5]);
      item.draw(context, transform, { selected: true });
      context.restore();
    });

    // selected items
    context.save();
    context.strokeStyle = "rgba(0,0,0,0.8)";
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.lineWidth = 1;
    tempItems.forEach(item => {
      item.draw(context, transform);
    });
    context.restore();

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
    switch (cursor.mode) {
      case "select":
        context.fillStyle = "rgba(68,68,85,0.2)";
        context.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
        break;
      case "delete":
        context.fillStyle = "rgba(185,0,0,0.2)";
        context.arc(pt.x, pt.y, r, 0, 2 * Math.PI);
        break;
      default:
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
