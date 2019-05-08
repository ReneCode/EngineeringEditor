import React from "react";
import appEventDispatcher from "../common/Event/AppEventDispatcher";

class KeyboardListener extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = () => {
    appEventDispatcher.dispatch("keyDown", event);
  };

  render() {
    return null;
  }
}

export default KeyboardListener;
