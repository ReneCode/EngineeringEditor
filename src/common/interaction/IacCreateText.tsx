import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicText from "../../model/graphic/GraphicText";

interface IProps {
  dispatch: Function;
}

class IacCreateText extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    const text = new GraphicText("Text", event.point);
    this.props.dispatch(cudElementAction("placement", text));
  };

  render() {
    return null;
  }
}

export default connect()(IacCreateText);
