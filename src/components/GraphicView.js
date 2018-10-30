import React, { Component } from "react";
import { connect } from "react-redux";

import TransformCoordinate from "../common/transformCoordinate";

import DrawCanvas from "./DrawCanvas";

import * as actions from "../actions";
import Point from "../common/Point";

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

    // const canvas = {
    //   width: rect.width,
    //   height: rect.height,
    // };
    // this.transform.init(this.props.graphic.viewport, canvas);
  };

  onMouseUp = ev => {
    const pt = this.getCursor(ev);
    this.props.dispatch(actions.mouseUp(pt));
  };

  onMouseDown = ev => {
    const pt = this.getCursor(ev);
    this.props.dispatch(actions.mouseDown(pt));
  };

  onMouseMove = ev => {
    const pt = this.getCursor(ev);
    this.props.dispatch(actions.mouseMove(pt));
  };

  getCursor(ev) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return new Point(ev.clientX - left, ev.clientY - top);
  }

  redraw = () => {
    const transform = new TransformCoordinate(
      this.props.graphic.viewport,
      this.props.graphic.canvas,
    );
    this.drawCanvas.draw(transform);
  };

  render() {
    return (
      <div ref={div => (this.frame = div)} className="GraphicView">
        {/* <div className="showtop">
          x:
          {this.props.graphic.cursor.x} y:
          {this.props.graphic.cursor.y}
        </div> */}
        <canvas
          ref={canvas => (this.canvas = canvas)}
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        />
        <DrawCanvas
          ref={ref => (this.drawCanvas = ref)}
          getCanvas={() => this.canvas}
          graphic={this.props.graphic}
        />
      </div>
    );
  }
}

GraphicView.propTypes = {};

const mapStateToProps = state => {
  return {
    graphic: state.graphic,
    page: state.project.page,
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true },
)(GraphicView);
