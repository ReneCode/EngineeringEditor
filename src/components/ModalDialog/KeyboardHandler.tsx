import React from "react";
import Paper from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";

interface IProps {
  enableKeyboardHandler: boolean;
}

class KeyboardHandler extends React.Component<IProps> {
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

    if (!this.props.enableKeyboardHandler) {
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

    switch (event.key) {
      case "PageUp":
        appEventDispatcher.dispatch("previousPage");
        event.preventDefault();

        break;
      case "PageDown":
        appEventDispatcher.dispatch("nextPage");
        event.preventDefault();
        break;

      case "+":
        appEventDispatcher.dispatch("zoomIn", this.state.cursor);
        break;
      case "-":
        appEventDispatcher.dispatch("zoomOut", this.state.cursor);
        break;
      case "Delete":
      case "Backspace":
        appEventDispatcher.dispatch("delete");
        event.preventDefault();
        break;

      case "a":
      case "A":
        if (event.metaKey || event.ctrlKey) {
          appEventDispatcher.dispatch("selectAll");
          event.preventDefault();
        }
        break;

      case "Escape":
        appEventDispatcher.dispatch("stopInteraction");
        break;

      case "l":
      case "L":
        appEventDispatcher.dispatch("startInteraction", "CreateLine");
        break;

      case "o":
      case "O":
        appEventDispatcher.dispatch("startInteraction", "CreateArc");
        break;

      case "s":
      case "S":
        appEventDispatcher.dispatch("showModal", "selectSymbol");
        break;

      case "t":
      case "T":
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
    enableKeyboardHandler: state.project.enableKeyboardHandler,
  };
};

export default connect(mapStateToProps)(KeyboardHandler);
