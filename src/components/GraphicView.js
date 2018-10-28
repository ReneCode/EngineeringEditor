import React, { Component } from "react";
import { connect } from "react-redux";

import DrawCanvas from "./DrawCanvas";

import ItemLine from "../model/ItemLine";
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

    const line = new ItemLine(
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
    this.props.dispatch(actions.mouseMove(pt.x, pt.y));
  };

  getCursor(ev) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return { x: ev.clientX - left, y: ev.clientY - top };
  }

  redraw = () => {
    this.drawCanvas.draw();
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
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true },
)(GraphicView);
