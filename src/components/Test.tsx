import React, { Component } from "react";

const paper = require("paper");

class Test extends Component {
  canvas: HTMLCanvasElement | null = null;
  view: any;
  componentDidMount = () => {
    paper.setup(this.canvas);
    this.view = paper.view;

    console.log(paper);
    console.log(paper.view);
    console.log(this.view.bounds);

    paper.settings.handleSize = 10;

    const func = () => {
      const path = new paper.Path();
      path.strokeColor = "blue";
      const p1 = new paper.Point(
        Math.random() * 600,
        Math.random() * 600,
      );
      const p2 = new paper.Point(
        Math.random() * 600,
        Math.random() * 600,
      );
      path.moveTo(p1);
      path.lineTo(p2);
      path.selected = true;
      const circle = new paper.Path.Circle(
        new paper.Point(50, 250),
        44,
      );
      circle.selected = true;

      console.log(path);
      // paper.view.draw()
    };

    for (let i = 0; i < 1; i++) {
      func();
    }
    // paper.project.selectAll();
    const layer = paper.project.activeLayer;
    layer.strokeColor = "red";
    // layer.dashArray = [8, 4];
    // let scale = 1.05;
    // setInterval(() => {
    //   layer.rotation = layer.rotation + 1;
    //   paper.view.scale(scale);
    // }, 150);
  };
  render() {
    return (
      <canvas
        width="600px"
        height="100%"
        ref={ref => (this.canvas = ref)}
        id="myCanvas"
      />
    );
  }
}

export default Test;
