import React, { Component } from "react";
import { connect } from "react-redux";
import { undoAction, redoAction } from "../actions/undoRedo";

interface IProps {
  dispatch: any;
}

class KeyboardHandler extends Component<IProps> {
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (ev: KeyboardEvent) => {
    if (ev.metaKey && ev.key === "z") {
      if (!ev.shiftKey) {
        this.props.dispatch(undoAction());
      } else {
        this.props.dispatch(redoAction());
      }
      ev.preventDefault();
    }
  };

  render() {
    return null;
  }
}

export default connect()(KeyboardHandler);