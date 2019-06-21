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
  text: GraphicText | null = null;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    this.createText(event.point);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    this.createText(event.point);
    if (this.text) {
      this.props.dispatch(cudElementAction("placement", this.text));
    }
    this.text = null;
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    this.createText(event.point);
  };

  createText(pt: Paper.Point) {
    if (!this.text) {
      this.text = new GraphicText("Text", pt);
    } else {
      this.text.pt = pt;
    }
    this.text.paperDraw();
  }

  render() {
    return null;
  }
}

export default connect()(IacCreateText);
