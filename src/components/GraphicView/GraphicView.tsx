import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";

import Point from "../../common/point";
import { IGlobalState } from "../../reducers";
import { setCanvasSize } from "../../actions/graphicActions";
import Paper from "paper";
import Placement from "../../model/Placement";
import drawCanvas from "../../common/drawCanvas";
import EventDispatcher from "../../common/AppEventDispatcher";
import InteractionEventDispatcher from "../../common/InteractionEventDispatcher";
import eventDispatcher from "../../common/AppEventDispatcher";

interface IProps {
  dispatch: Function;
  items: Placement[];
}

interface IState {
  width: number;
  height: number;
}

class GraphicView extends Component<IProps> {
  frame: any;
  canvas: HTMLCanvasElement | null = null;
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
  }
  componentDidMount() {
    if (this.canvas) {
      Paper.setup(this.canvas);
      Paper.settings.handleSize = 8;

      Paper.view.onMouseDown = this.onMouseDown;
      Paper.view.onMouseUp = this.onMouseUp;
      Paper.view.onMouseMove = this.onMouseMove;
      Paper.view.onMouseDrag = this.onMouseDrag;
    }

    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.items !== this.props.items) {
      drawCanvas(Paper.view, this.props.items);
    }
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    eventDispatcher.dispatch({ type: "mouseDown", payload: event });
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    eventDispatcher.dispatch({ type: "mouseUp", payload: event });
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    eventDispatcher.dispatch({ type: "mouseDrag", payload: event });
    // this.dispatchToInteractions(ia => ia.onMouseDrag(event));
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    eventDispatcher.dispatch({ type: "mouseMove", payload: event });
    // this.dispatchToInteractions(ia => ia.onMouseMove(event));
  };

  onResize = () => {
    // https://stackoverflow.com/questions/32230690/resize-div-containing-a-canvas/33558386#33558386
    // hide the canvas to get the correct parent size

    if (this.canvas) {
      const displayBackup = this.canvas.style.display;
      this.canvas.style.display = "none";
      const { width, height } = this.frame.getBoundingClientRect();
      this.canvas.style.display = displayBackup;

      this.setState({
        width: width,
        height: height,
      });
      Paper.view.viewSize = new Paper.Size(width, height);

      // 0,0 point in left,bottom
      Paper.view.matrix = new Paper.Matrix(1, 0, 0, -1, 0, height);

      // this.props.dispatch(setCanvasSize(rect.width, rect.height));
    }
  };

  onContextMenu = (ev: SyntheticEvent) => {
    console.log("onContextMenu:", ev);
  };

  getCursor = (ev: MouseEvent): Point => {
    if (this.canvas) {
      const { top, left } = this.canvas.getBoundingClientRect();
      return new Point(ev.clientX - left, ev.clientY - top);
    }
    return new Point();
  };

  render() {
    return (
      <div ref={div => (this.frame = div)} className="GraphicView">
        <canvas
          tabIndex={0}
          className="canvas"
          ref={canvas => (this.canvas = canvas)}
          width={this.state.width}
          height={this.state.height}
          onContextMenu={this.onContextMenu}
        />
        <InteractionEventDispatcher />
        {/* <DrawCanvas
          getCanvas={() => this.canvas as HTMLCanvasElement}
        /> */}
        {/* <Interaction
          getCanvas={() => this.canvas as HTMLCanvasElement}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
  };
};

const ConnectedComponent = connect(mapStateToProps)(GraphicView);

export default ConnectedComponent;
