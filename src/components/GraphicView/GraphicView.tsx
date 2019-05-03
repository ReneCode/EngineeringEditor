import React, { Component, SyntheticEvent, createRef } from "react";
import { connect } from "react-redux";

import Point from "../../common/point";
import { IGlobalState } from "../../reducers";
import Paper from "paper";
import Placement from "../../model/Placement";
import drawCanvas, { createPaperItem } from "../../common/drawCanvas";
import EventHandlerInteraction from "../../common/Event/EventHandlerInteraction";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { IdType } from "../../model/types";
import {
  ItemMetaData,
  itemGetMetaData,
} from "../../common/ItemMetaData";
import ResizeBox from "../../common/interaction/ResizeBox";
import PaperCanvas from "./PaperCanvas";
import IacSelect from "../../common/interaction/IacSelect";
import {
  IIacComponent,
  IIacNull,
} from "../../common/interaction/IIacComponent";

interface IProps {
  dispatch: Function;
  items: Placement[];
  pageId: IdType;
  projectId: IdType;
  selectedPaperItems: Paper.Item[];
}

interface IState {
  width: number;
  height: number;
}

class GraphicView extends Component<IProps> {
  frame: any;
  canvas: HTMLCanvasElement | null = null;
  state: IState;
  paperCanvas: PaperCanvas | null = null;
  iac: IIacComponent = new IIacNull();
  private iacRef = createRef<IIacComponent>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
  }
  componentDidMount() {
    if (this.canvas) {
      // this.paperCanvas = new PaperCanvas(
      //   this.canvas,
      //   this.props.dispatch,
      // );
      // this.paperCanvas.startInteraction("select");

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

  async componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevProps.selectedPaperItems !== this.props.selectedPaperItems
    ) {
      if (this.paperCanvas) {
        this.paperCanvas.setSelectedPaperItems(
          this.props.selectedPaperItems,
        );
      }
    }
    if (
      // prevProps.pageId !== this.props.pageId ||
      // prevProps.projectId !== this.props.projectId
      prevProps.items != this.props.items
    ) {
      drawCanvas(Paper.project, this.props.items);
    }
    /*
    if (prevProps.changes !== this.props.changes) {
      const { type, data } = this.props.changes;
      const placement = data[0];
      const layer = Paper.project.activeLayer;
      if (type === "update") {
        for (let i = 0; i < layer.children.length; i++) {
          const metaData = layer.children[i].data as ItemMetaData;
          if (metaData.placement.id === placement.id) {
            // this data should be replaced
            layer.children[i].remove();

            const item = createPaperItem(metaData.placement);

            if (item) {
              if (metaData.resizeBox) {
                const resizeBox = ResizeBox.create(item);
                const metaData = itemGetMetaData(item);
                metaData.resizeBox = resizeBox;
              }
              layer.insertChild(i, item);
            }
            break;
          }
        }
      }
      // deltaChangeView(this.props.items)
    }
    */
  }

  private onMouseDown = (event: Paper.MouseEvent) => {
    this.iac.onMouseDown(event);
  };

  private onMouseUp = (event: Paper.MouseEvent) => {
    this.iac.onMouseUp(event);
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    this.iac.onMouseDrag(event);
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    this.iac.onMouseMove(event);
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
    const interactionComponent = (
      <IacSelect ref={(e: any) => (this.iacRef = e)} />
      // <IacSelect
      //   ref={(iac: any) =>
      //     (this.iac = iac.getWrappedInstance() as IIacComponent)
      //   }
      // />
    );

    console.log("render");
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
        <EventHandlerInteraction />
        {interactionComponent}
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    // items: state.graphic.items,
    pageId: state.project.pageId,
    projectId: state.project.projectId,
    items: state.graphic.items,
    selectedPaperItems: state.graphic.selectedPaperItems,
  };
};

const ConnectedComponent = connect(mapStateToProps)(GraphicView);

export default ConnectedComponent;
