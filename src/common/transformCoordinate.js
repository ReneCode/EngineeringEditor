import Point from "./Point";

class TransformCoordinate {
  constructor(viewport, canvas) {
    //  adapt viewport to get vieport and canvas fit together
    const ratioX = canvas.width / viewport.width;
    const ratioY = canvas.height / viewport.height;
    this.viewport = { ...viewport };
    this.canvas = { ...canvas };
    if (ratioX > ratioY) {
      // keep height of viewport / keep ratioY
      // strech x to both sides
      this.scale = ratioY;
      const oldVpWidth = this.viewport.width;
      this.viewport.width = this.canvas.width / ratioY;
      this.viewport.x -= (this.viewport.width - oldVpWidth) / 2;
    } else {
      // keep width of viewport
      // stretch height and center it
      this.scale = ratioX;
      const oldVpHeight = this.viewport.height;
      this.viewport.height = this.canvas.height / ratioX;
      this.viewport.y -= (this.viewport.height - oldVpHeight) / 2;
    }
  }

  wcToCanvas(pt) {
    const x = (pt.x - this.viewport.x) * this.scale;
    const y =
      this.canvas.height - (pt.y - this.viewport.y) * this.scale;
    return new Point(x, y);
  }

  canvasToWc(pt) {
    const x = pt.x / this.scale + this.viewport.x;
    const y =
      (this.canvas.height - pt.y) / this.scale + this.viewport.y;
    return new Point(x, y);
  }
}

export default TransformCoordinate;
