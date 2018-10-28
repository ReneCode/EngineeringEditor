import React, { Component } from "react";
import { connect } from "react-redux";

import { LineItem } from "../model/Items";
import * as actions from "../actions/actions";

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
    this.props.dispatch(
      actions.setCanvasSize(rect.width, rect.height),
    );
  };

  onMouseDown = ev => {
    const pt = this.getCursor(ev);

    const line = new LineItem(
      pt.x - 50,
      pt.y - 100,
      pt.x + 50,
      pt.y + 100,
    );
    this.props.dispatch(actions.addGraphicItem(line));
  };

  onMouseUp = ev => {};

  onMouseMove = ev => {
    const pt = this.getCursor(ev);
    console.log(pt);
  };

  getCursor(ev) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return { x: ev.clientX - left, y: ev.clientY - top };
  }

  redraw = () => {
    this.context = this.canvas.getContext("2d");

    this.props.graphic.items.forEach(i => {
      this.context.beginPath();

      this.context.lineWidth = 1;
      this.context.moveTo(i.x1, i.y1);
      this.context.lineTo(i.x2, i.y2);

      this.context.stroke();
    });

    this.context.beginPath();

    this.context.lineWidth = 1;
    this.context.moveTo(0, 0);
    this.context.lineTo(this.state.width, this.state.height);
    /*
    this.context.moveTo(0, 0);

    this.context.moveTo(this.state.width / 2, 0);
    this.context.lineTo(this.state.width / 2, this.state.height);

    this.context.moveTo(0, this.state.height / 2);
    this.context.lineTo(this.state.width, this.state.height / 2);
*/
    this.context.stroke();
  };

  render() {
    return (
      <div ref={div => (this.frame = div)} className="GraphicView">
        <canvas
          ref={canvas => (this.canvas = canvas)}
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        />
      </div>
    );
  }
}

GraphicView.propTypes = {};

const mapStateToProps = state => {
  return {
    graphic: state.graphic,
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true },
)(GraphicView);
