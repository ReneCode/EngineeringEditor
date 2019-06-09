import React from "react";
import appEventDispatcher from "../common/Event/AppEventDispatcher";

class KeyboardDispatcher extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (event: any) => {
    appEventDispatcher.dispatch("keyDown", event);
  };

  render() {
    return null;
  }
}

export default KeyboardDispatcher;
