import React from "react";
import Paper from "paper";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";

class KeybaordHandler extends React.Component {
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

  onKeyDown = (type: AppEventType, event: KeyboardEvent) => {
    // TODO decide if mac or windows user
    // mac => metaKey,  windows => ctrlKey
    if ((event.metaKey || event.ctrlKey) && event.key === "z") {
      if (event.shiftKey) {
        appEventDispatcher.dispatch("redo");
      } else {
        appEventDispatcher.dispatch("undo");
      }
      event.preventDefault();
    }

    switch (event.key) {
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
    }
  };

  mouseEventHandler = (
    type: AppEventType,
    event: Paper.MouseEvent,
  ) => {
    this.setState({
      cursor: event.point,
    });
  };

  render() {
    return null;
  }
}

export default KeybaordHandler;
