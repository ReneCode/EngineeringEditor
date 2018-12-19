import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";

import TransformCoordinate from "../common/transformCoordinate";

import DrawCanvas from "./DrawCanvas";

import * as actions from "../actions";
import Point from "../common/point";
import { IGlobalState } from "../reducers";
import { IGraphicState } from "../reducers/graphicReducer";
import Interaction from "./interaction/Interaction";
import Autoconnection from "./Autoconnection";

interface IProps {
  dispatch: Function;
  graphic: IGraphicState;
  state: IGlobalState;
}

interface IState {
  width: number;
  height: number;
}

class GraphicView extends Component<IProps> {
  frame: any;
  canvas: any;
  drawCanvas: any;
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
    this.frame = React.createRef();
    this.canvas = React.createRef();
    this.drawCanvas = {};
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

  onMouseUp = (ev: SyntheticEvent) => {
    const pt = this.getCursor(ev as any);
    this.props.dispatch(actions.mouseUp(pt));
  };

  onMouseDown = (event: SyntheticEvent) => {
    const ev: MouseEvent = event as any;
    if (ev.button === 0) {
      // left button
      const pt = this.getCursor(ev);
      this.props.dispatch(actions.mouseDown(pt));
    }
  };

  onMouseMove = (ev: SyntheticEvent) => {
    const pt = this.getCursor(ev as any);
    this.props.dispatch(actions.mouseMove(pt));
  };

  onContextMenu = (ev: SyntheticEvent) => {
    console.log("onContextMenu:", ev);
  };

  getCursor = (ev: MouseEvent) => {
    const { top, left } = this.canvas.getBoundingClientRect();
    return new Point(ev.clientX - left, ev.clientY - top);
  };

  redraw = () => {
    const transform = new TransformCoordinate(
      this.props.graphic.viewport,
      this.props.graphic.canvas,
    );
    this.drawCanvas.draw(transform);
  };

  render() {
    const transform = new TransformCoordinate(
      this.props.graphic.viewport,
      this.props.graphic.canvas,
    );

    const { gridX, gridY } = this.props.graphic.canvas;
    const cursorWc = transform
      .canvasToWc(this.props.graphic.cursor.pt)
      .snap(gridX, gridY);

    return (
      <div ref={div => (this.frame = div)} className="GraphicView">
        <div className="showtop">
          x:
          {cursorWc.x} y:
          {cursorWc.y}
        </div>
        <canvas
          className="canvas"
          ref={canvas => (this.canvas = canvas)}
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onContextMenu={this.onContextMenu}
        />
        <DrawCanvas
          ref={ref => (this.drawCanvas = ref)}
          getCanvas={() => this.canvas}
          graphic={this.props.graphic}
        />
        <Autoconnection />
        <Interaction
          getCanvas={() => this.canvas}
          getState={() => this.props.state}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    state: state,
    graphic: state.graphic,
    page: state.project.page,
  };
};

const ConnectedComponent = connect(
  mapStateToProps,
  null,
  null,
  { withRef: true },
)(GraphicView);

export default ConnectedComponent;

/*
export type Instance<T> = T extends { new (...args: any[]): infer U }
  ? U
  : never;

export type GetProps<T> = T extends React.ComponentType<infer P>
  ? P
  : never;

export type GetWrappedComponent<T> = T extends {
  WrappedComponent: infer C;
}
  ? C
  : never;

export type ConnectWithRef<T> = {
  new (props: GetProps<T>): Instance<T> & {
    getWrappedInstance?: () => Instance<GetWrappedComponent<T>>;
  };
};

export default ConnectedComponent as ConnectWithRef<
  typeof ConnectedComponent
>;
*/
