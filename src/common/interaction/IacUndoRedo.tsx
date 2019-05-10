import React from "react";
import { connect } from "react-redux";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { undoAction, redoAction } from "../../actions/undoRedo";

interface IProps {
  dispatch: any;
}

class IacUndoRedo extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("undo", () => {
        this.props.dispatch(undoAction());
      }),
    );

    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("redo", () => {
        this.props.dispatch(redoAction());
      }),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  render() {
    return null;
  }
}

export default connect()(IacUndoRedo);
