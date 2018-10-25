import React, { Component } from "react";
class Canvas extends Component {
  canvas = undefined;
  context = undefined;
  state = {
    width: 100,
    height: 200,
  };

  componentDidMount() {
    this.context = this.canvas.getContext("2d");
    this.context.beginPath();
    this.context.rect(0, 0, 300, 150);
    this.context.fillStyle = "blue";
    this.context.fill();

    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize(ev) {
    console.log(ev);
  }

  handleMouseDown = ev => {};

  handleMouseUp = ev => {};

  handleMouseMove = ev => {
    const pt = this.getCursor(ev);
    console.log(pt);
  };

  getCursor(ev) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return [ev.clientX - left, ev.clientY - top];
  }

  render() {
    return (
      <canvas
        width={this.state.width}
        height={this.state.height}
        ref={canvas => (this.canvas = canvas)}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}

export default Canvas;
