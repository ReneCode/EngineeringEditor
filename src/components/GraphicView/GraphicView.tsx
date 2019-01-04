import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";

import DrawCanvas from "./DrawCanvas";

import Point from "../../common/point";
import { IGlobalState } from "../../reducers";
import { IGraphicState } from "../../reducers/graphicReducer";
import Interaction from "../interaction/Interaction";
import Statusbar from "./Statusbar";
import { setCanvasSize } from "../../actions/graphicActions";

interface IProps {
  dispatch: Function;
  graphic: IGraphicState;
}

interface IState {
  width: number;
  height: number;
}

class GraphicView extends Component<IProps> {
  frame: any;
  canvas: any;
  state: IState;

  constructor(props: IProps) {
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
    this.props.dispatch(setCanvasSize(rect.width, rect.height));
  };

  onContextMenu = (ev: SyntheticEvent) => {
    console.log("onContextMenu:", ev);
  };

  getCursor = (ev: MouseEvent) => {
    const { top, left } = this.canvas.getBoundingClientRect();
    return new Point(ev.clientX - left, ev.clientY - top);
  };

  render() {
    return (
      <div className="middle-content">
        <div ref={div => (this.frame = div)} className="GraphicView">
          <canvas
            className="canvas"
            ref={canvas => (this.canvas = canvas)}
            width={this.state.width}
            height={this.state.height}
            onContextMenu={this.onContextMenu}
          />
          <DrawCanvas getCanvas={() => this.canvas} />
          <Interaction getCanvas={() => this.canvas} />
        </div>
        <Statusbar cursor={"cursorWc"} />
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    graphic: state.graphic,
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
