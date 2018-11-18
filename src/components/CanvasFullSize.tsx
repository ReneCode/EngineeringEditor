import React, { Component } from "react";

interface IProps {}

class CanvasFullSize extends Component<IProps> {
  canvas: any;
  frame: any;
  state: { width: number; height: number };

  constructor(props: any) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
    this.frame = React.createRef();
    this.canvas = React.createRef();
  }
  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.redraw();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidUpdate() {
    this.redraw();
  }

  onResize = () => {
    // https://stackoverflow.com/questions/32230690/resize-div-containing-a-canvas/33558386#33558386
    // hide the canvas to get the correct parent size
    if (this.canvas && this.frame) {
      const displayBackup = this.canvas.style.display;
      this.canvas.style.display = "none";
      const rect = this.frame.getBoundingClientRect();
      this.canvas.style.display = displayBackup;

      this.setState({
        width: rect.width,
        height: rect.height,
      });
    }
  };

  redraw = () => {
    if (
      this.canvas &&
      this.props.children &&
      typeof this.props.children === "function"
    ) {
      this.props.children(
        this.canvas,
        this.state.width,
        this.state.height,
      );
    }
  };

  render() {
    return (
      <div className="canvas-frame" ref={div => (this.frame = div)}>
        <canvas
          className="canvas"
          ref={canvas => (this.canvas = canvas)}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}

export default CanvasFullSize;
