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
      const oldVpWidth = this.viewport.width;
      this.viewport.width = this.canvas.width / ratioY;
      this.viewport.x -= (this.viewport.width - oldVpWidth) / 2;
    } else {
      // keep width of viewport
      // stretch height and center it
      const oldVpHeight = this.viewport.height;
      this.viewport.height = this.canvas.height / ratioX;
      this.viewport.y -= (this.viewport.height - oldVpHeight) / 2;
    }
  }

  wcToScreen(pt) {}
}

export default TransformCoordinate;
