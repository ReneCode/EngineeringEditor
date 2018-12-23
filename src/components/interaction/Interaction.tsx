import { Component } from "react";
import Point from "../../common/point";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { IGlobalState } from "../../reducers";
import TransformCoordinate from "../../common/transformCoordinate";
import InteractionStarter from "./InteractionStarter";
import { IaContext, GetEventResult, IaEventType } from "./IaBase";
import { IA_SELECT } from "../../actions/interactionTypes";

interface IProps {
  getCanvas(): HTMLCanvasElement;
  dispatch: Function;
  state: IGlobalState;
}

class Interaction extends Component<IProps> {
  waitTypes: IaEventType[] = [];
  promiseResolve: Function | null = () => {};
  promiseReject: Function | null = () => {};
  iaStarter: InteractionStarter;

  constructor(props: IProps) {
    super(props);

    this.iaStarter = new InteractionStarter();
  }

  async componentDidMount() {
    const canvas = this.props.getCanvas();
    if (canvas) {
      canvas.addEventListener("mousedown", this.onMouseDown);
      canvas.addEventListener("mousemove", this.onMouseMove);
      canvas.addEventListener("mouseup", this.onMouseUp);
      document.addEventListener("keydown", this.onKeyDown);
    }

    this.props.dispatch(
      actions.setStartInteractionHandler(this.startInteraction),
    );

    this.props.dispatch(actions.startInteraction(IA_SELECT));
  }

  componentWillUnmount() {
    const canvas = this.props.getCanvas();
    if (canvas) {
      canvas.removeEventListener("mousedown", this.onMouseDown);
      canvas.removeEventListener("mousemove", this.onMouseMove);
      canvas.removeEventListener("mouseup", this.onMouseUp);
      document.removeEventListener("keydown", this.onKeyDown);
    }
    this.props.dispatch(actions.setStartInteractionHandler(() => {}));
  }

  onKeyDown = (ev: KeyboardEvent) => {
    this.resolveEvent(IaEventType.keyDown, ev);
  };

  onMouseDown = (ev: MouseEvent) => {
    this.resolveEvent(IaEventType.mouseDown, ev);
  };

  onMouseMove = (ev: MouseEvent) => {
    this.resolveEvent(IaEventType.mouseMove, ev);
  };

  onMouseUp = (ev: MouseEvent) => {
    this.resolveEvent(IaEventType.mouseUp, ev);
  };

  getCursor = (ev: MouseEvent) => {
    const {
      top,
      left,
    } = this.props.getCanvas().getBoundingClientRect();
    return new Point(ev.clientX - left, ev.clientY - top);
  };

  resolveEvent = (
    type: IaEventType,
    event: MouseEvent | KeyboardEvent,
  ) => {
    if (this.waitTypes.indexOf(type) >= 0) {
      // that is the event I was looking for

      if (event instanceof KeyboardEvent) {
        if (!this.promiseResolve) {
          throw new Error("promiseResolve missing");
        }
        return this.promiseResolve({
          type,
          event,
        });
      }
      if (event instanceof MouseEvent) {
        const pointCanvas = this.getCursor(event as MouseEvent);

        const { canvas, viewport } = this.props.state.graphic;
        const transform = new TransformCoordinate(viewport, canvas);

        // transform canvas point to world-coordinate point
        let pointWc = transform.canvasToWc(pointCanvas);
        if (canvas.useGrid) {
          // snap to grid
          pointWc = pointWc.snap(canvas.gridX, canvas.gridY);
        }

        if (!this.promiseResolve) {
          throw new Error("promiseResolve missing");
        }
        return this.promiseResolve({
          type,
          event,
          pointWc,
          pointCanvas,
          transform,
        });
      }
    }
  };

  getEvent = (types: IaEventType[] | IaEventType): GetEventResult => {
    if (!Array.isArray(types)) {
      types = [types];
    }
    this.waitTypes = types;
    return new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  };

  startInteraction = (action: any) => {
    // finish current promise
    if (this.promiseResolve) {
      this.promiseResolve(null);
    }
    this.promiseResolve = null;
    this.promiseReject = null;

    const iaConfig: IaContext = {
      getEvent: this.getEvent,
      getState: () => this.props.state,
      dispatch: this.props.dispatch,
    };

    this.iaStarter.start(iaConfig, action);
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Interaction);
