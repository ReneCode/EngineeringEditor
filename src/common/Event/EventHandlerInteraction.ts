import Paper from "paper";
import appEventDispatcher, { AppEvent } from "./AppEventDispatcher";
import { IAppEventHandler } from "./IAppEventHandler";
import InteractionBase from "../interaction/InteractionBase";
import { Component } from "react";
import { connect } from "react-redux";
import IaSelect from "../../components/interaction/IaSelect";
import InteractionSelect from "../interaction/InteractionSelect";
import InteractionZoom from "../interaction/InteractionZoom";
import InteractionLine from "../interaction/InteractionLine";
import InteractionCircle from "../interaction/InteractionCircle";
import { IGlobalState } from "../../reducers";

interface IProps {
  dispatch: any;
  state: IGlobalState;
}

class EventHandlerInteraction extends Component<IProps>
  implements IAppEventHandler {
  interaction: InteractionBase | null = null;

  constructor(props: any) {
    super(props);
    appEventDispatcher.subscribe(this);

    appEventDispatcher.dispatch({
      type: "startInteraction",
      payload: "Select",
    });
  }

  receiveEvent(event: AppEvent): void {
    switch (event.type) {
      case "startInteraction":
        this.startInteraction(event);
        break;

      case "mouseDown":
        this.onMouseDown(event.payload);
        break;
      case "mouseUp":
        this.onMouseUp(event.payload);
        break;
      case "mouseMove":
        this.onMouseMove(event.payload);
        break;
      case "mouseDrag":
        this.onMouseDrag(event.payload);
        break;
    }
  }

  startInteraction = (event: AppEvent) => {
    this.stopCurrentInteraction();

    const name: string = event.payload;
    const context = {
      dispatch: this.props.dispatch,
      getState: () => this.props.state,
    };
    let interaction: InteractionBase;
    switch (name) {
      case "Select":
        interaction = new InteractionSelect(context);
        break;
      case "Zoom":
        interaction = new InteractionZoom(context);
        break;
      case "Line":
        interaction = new InteractionLine(context);
        break;
      case "Circle":
        interaction = new InteractionCircle(context);
        break;
      default:
        throw new Error(`InteractionName not registered: ${name}`);
    }
    this.interaction = interaction;
  };

  private stopCurrentInteraction() {
    if (this.interaction) {
      this.interaction.stop();
    }
  }

  dispatchToInteractions(callback: (ia: InteractionBase) => void) {
    if (this.interaction) {
      const result = callback(this.interaction);
    }
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    this.dispatchToInteractions(ia => ia.onMouseDown(event));
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    this.dispatchToInteractions(ia => ia.onMouseUp(event));
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    this.dispatchToInteractions(ia => ia.onMouseDrag(event));
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    this.dispatchToInteractions(ia => ia.onMouseMove(event));
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(EventHandlerInteraction);
