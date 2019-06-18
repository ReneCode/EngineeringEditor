import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicGroup from "../../model/graphic/GraphicGroup";

interface IProps {
  dispatch: Function;
}

class IacGroup extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "group",
      this.onCreateGroup,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onCreateGroup = (placements: Placement[]) => {
    if (!placements || placements.length <= 1) {
      throw new Error("payload not suitable");
    }
    const group = new GraphicGroup(placements);

    this.props.dispatch(
      cudElementAction("placement", group, undefined, placements),
    );
  };

  render() {
    return null;
  }
}

export default connect()(IacGroup);
