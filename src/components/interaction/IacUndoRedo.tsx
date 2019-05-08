import React from "react";
import { connect } from "react-redux";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";
import { undoAction, redoAction } from "../../actions/undoRedo";

interface IProps {
  dispatch: any;
}

class IacUndoRedo extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    console.log("undoRedo");
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "keyDown",
      this.onKeyDown,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onKeyDown = (type: AppEventType, event: KeyboardEvent) => {
    console.log("undoRedo-keydown");

    // TODO decide if mac or windows user
    // mac => metaKey,  windows => ctrlKey
    if ((event.metaKey || event.ctrlKey) && event.key === "z") {
      if (!event.shiftKey) {
        this.props.dispatch(undoAction());
      } else {
        this.props.dispatch(redoAction());
      }
      event.preventDefault();
    }
  };

  render() {
    return null;
  }
}

export default connect()(IacUndoRedo);
