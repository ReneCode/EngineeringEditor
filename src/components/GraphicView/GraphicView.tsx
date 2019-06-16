import React, { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../actions/actionTypes";

import { IGlobalState } from "../../store/reducers";
import Paper, { Point } from "paper";
import Placement from "../../model/Placement";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import InteractionManager from "../../common/Event/InteractionManager";
import PaperUtil from "../../utils/PaperUtil";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import updateSymbolRef from "../../model/updateSymbolRef";

interface IProps {
  items: Placement[];
  symbols: GraphicSymbol[];
  dispatch: Function;
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

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.items !== this.props.items ||
      prevProps.symbols !== this.props.symbols
    ) {
      console.log("draw Canvas:", this.props.items.length);

      const project = Paper.project;
      project.activeLayer.removeChildren();

      updateSymbolRef(this.props.items, this.props.symbols);
      for (let placement of this.props.items) {
        placement.paperDraw();
      }

      // now the other components can work with the drawn Paper items
      this.props.dispatch({ type: actionTypes.REDRAWN });
    }
  }

  componentDidMount() {
    if (this.canvas) {
      PaperUtil.setup(this.canvas);

      // // https://github.com/sasensi/paperjs-layers-panel
      // (window as any).paperjsLayersPanel.create({
      //   project: Paper.project,
      //   parent: this.canvas.parentElement,
      // });

      Paper.view.onMouseDown = this.onMouseDown;
      Paper.view.onMouseUp = this.onMouseUp;
      Paper.view.onMouseMove = this.onMouseMove;
      Paper.view.onMouseDrag = this.onMouseDrag;

      // use navite addEventListener and no onWheel of <canvas ...>
      // because with native event preventDefault() is possible
      this.canvas.addEventListener("wheel", this.onWheel);
    }

    window.addEventListener("resize", this.onResize);

    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("wheel", this.onWheel);
  }

  private onMouseDown = (event: Paper.MouseEvent) => {
    appEventDispatcher.dispatch("mouseDown", event);
  };

  private onMouseUp = (event: Paper.MouseEvent) => {
    appEventDispatcher.dispatch("mouseUp", event);
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    appEventDispatcher.dispatch("mouseDrag", event);
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    appEventDispatcher.dispatch("mouseMove", event);
  };

  onTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    console.log(":", event);
  };

  onTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    console.log(":", event);
  };

  // onWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
  onWheel = (event: WheelEvent) => {
    // console.log(
    //   ":",
    //   event.deltaMode,
    //   event.deltaX,
    //   event.deltaY,
    //   event.deltaZ,
    // );

    // if (event.deltaX === -0) {
    //   // pinch
    //   const center = Paper.view.center;
    //   let scale = 1.0;
    //   if (event.deltaY > 0) {
    //     scale = 1 - event.deltaY * 0.005;
    //   } else {
    //     scale = 1 - event.deltaY * 0.005;
    //   }
    //   Paper.view.scale(scale, center);
    // } else {
    // panning
    Paper.view.center = Paper.view.center.add(
      new Point(event.deltaX, event.deltaY),
    );
    // }

    event.preventDefault();
    // event.stopPropagation();
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
      //Paper.view.matrix = new Paper.Matrix(1, 0, 0, -1, 0, height);

      // this.props.dispatch(setCanvasSize(rect.width, rect.height));
    }
  };

  onContextMenu = (ev: SyntheticEvent) => {
    console.log("onContextMenu:", ev);
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
          // onContextMenu={this.onContextMenu}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          // onWheel={this.onWheel}
        />
        <InteractionManager />
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
    symbols: state.graphic.symbols,
  };
};

export default connect(mapStateToProps)(GraphicView);
