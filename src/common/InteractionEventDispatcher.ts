import Paper from "paper";
import appEventDispatcher, {
  AppEventSubscriber,
  AppEvent,
} from "./AppEventDispatcher";
import InteractionBase from "./interaction/InteractionBase";
import { Component } from "react";
import { connect } from "react-redux";
import IaSelect from "../components/interaction/IaSelect";
import InteractionSelect from "./interaction/InteractionSelect";
import InteractionName from "./interaction/InteractionName";
import InteractionZoom from "./interaction/InteractionZoom";
import InteractionLine from "./interaction/InteractionLine";

interface IProps {
  dispatch: any;
}

class InteractionEventDispatcher extends Component<IProps>
  implements AppEventSubscriber {
  interaction: InteractionBase | null = null;

  constructor(props: any) {
    super(props);
    appEventDispatcher.subscribe(this);
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
    const name: InteractionName = event.payload;
    const context = { dispatch: this.props.dispatch };
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
      default:
        console.log(`InteractionName not registered: ${name}`);
        return;
    }
    this.interaction = interaction;
  };

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

export default connect()(InteractionEventDispatcher);
