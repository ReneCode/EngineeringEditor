import React from "react";
import { connect } from "react-redux";
import Paper from "paper";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicText from "../../model/graphic/GraphicText";
import { snapEvent } from "../SnapToGrid";

interface IProps {
  dispatch: Function;
}

class IacCreateText extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];
  text: GraphicText | null = null;
  item: Paper.Item = new Paper.Item();

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
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
    if (this.item) {
      this.item.remove();
    }
  }

  onMouseMove = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);

    this.createText(pt);
  };

  onMouseDown = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);
    this.createText(pt);
  };

  onMouseUp = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);
    this.createText(pt);
    if (this.text) {
      this.props.dispatch(cudElementAction("placement", this.text));
    }
    this.text = null;
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    const pt = snapEvent(event);
    this.createText(pt);
  };

  createText(pt: Paper.Point) {
    if (!this.text) {
      this.text = new GraphicText("Text", pt);
    } else {
      this.text.pt = pt;
    }
    this.item = this.text.paperDraw();
  }

  render() {
    return null;
  }
}

export default connect()(IacCreateText);
