import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import appEventDispatcher from "../common/Event/AppEventDispatcher";
import { IGlobalState } from "../store/reducers";

interface IProps {
  enableShortcutHandler: boolean;
  selectedPlacementIds: string[];
}

class ShortcutHandler extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  state = {
    cursor: new Paper.Point(0, 0),
  };

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("keyDown", this.onKeyDown),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "mouseMove",
        this.mouseEventHandler,
      ),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe(
        "mouseDrag",
        this.mouseEventHandler,
      ),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onKeyDown = (event: KeyboardEvent) => {
    // console.log("key:", event.key);

    if (!this.props.enableShortcutHandler) {
      return;
    }

    // TODO decide if mac or windows user
    // mac => metaKey,  windows => ctrlKey

    // shift on mac      event.key = "z"
    // shift on windows: event.key = "Z"
    if (
      (event.metaKey || event.ctrlKey) &&
      (event.key === "z" || event.key === "Z")
    ) {
      if (event.shiftKey) {
        appEventDispatcher.dispatch("redo");
      } else {
        appEventDispatcher.dispatch("undo");
      }
      event.preventDefault();
    }

    switch (event.key.toLowerCase()) {
      case "pageup":
        appEventDispatcher.dispatch("previousPage");
        event.preventDefault();

        break;
      case "pagedown":
        appEventDispatcher.dispatch("nextPage");
        event.preventDefault();
        break;

      case "+":
        appEventDispatcher.dispatch("zoomIn", this.state.cursor);
        break;
      case "-":
        appEventDispatcher.dispatch("zoomOut", this.state.cursor);
        break;
      case "delete":
      case "backspace":
        appEventDispatcher.dispatch(
          "delete",
          this.props.selectedPlacementIds,
        );
        event.preventDefault();
        break;

      case "a":
        if (event.metaKey || event.ctrlKey) {
          appEventDispatcher.dispatch("selectAll");
        }
        break;

      case "c":
        if (event.metaKey || event.ctrlKey) {
          appEventDispatcher.dispatch("copy");
        }
        break;

      case "v":
        if (event.metaKey || event.ctrlKey) {
          appEventDispatcher.dispatch("paste");
        }
        break;

      case "escape":
        appEventDispatcher.dispatch("stopInteraction");
        break;

      case "l":
        appEventDispatcher.dispatch("startInteraction", "CreateLine");
        break;

      case "o":
        appEventDispatcher.dispatch("startInteraction", "CreateArc");
        break;

      case "s":
        appEventDispatcher.dispatch("showModal", "selectSymbol");
        break;

      case "t":
        appEventDispatcher.dispatch("startInteraction", "CreateText");
        break;

      default:
        return;
    }
    event.stopPropagation();
    event.preventDefault();
  };

  mouseEventHandler = (event: Paper.MouseEvent) => {
    this.setState({
      cursor: event.point,
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    enableShortcutHandler: state.project.enableShortcutHandler,
    selectedPlacementIds: state.graphic.selectedPlacementIds,
  };
};

export default connect(mapStateToProps)(ShortcutHandler);
