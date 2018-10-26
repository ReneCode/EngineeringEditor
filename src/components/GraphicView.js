import React, { Component } from "react";

class GraphicView extends Component {
  constructor(props) {
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
    const displayBackup = this.canvas.style.display;
    this.canvas.style.display = "none";
    const rect = this.frame.getBoundingClientRect();
    this.canvas.style.display = displayBackup;

    this.setState({
      width: rect.width,
      height: rect.height,
    });
  };

  redraw = () => {
    this.context = this.canvas.getContext("2d");
    this.context.beginPath();

    this.context.lineWidth = 1;
    this.context.moveTo(0, 0);
    this.context.lineTo(this.state.width, this.state.height);
    this.context.moveTo(0, 0);

    this.context.moveTo(this.state.width / 2, 0);
    this.context.lineTo(this.state.width / 2, this.state.height);

    this.context.moveTo(0, this.state.height / 2);
    this.context.lineTo(this.state.width, this.state.height / 2);

    this.context.stroke();
  };

  render() {
    return (
      <div ref={div => (this.frame = div)} className="GraphicView">
        <canvas
          ref={canvas => (this.canvas = canvas)}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}

GraphicView.propTypes = {};

export default GraphicView;
