import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Placement from "../../model/Placement";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicGroup from "../../model/graphic/GraphicGroup";

interface IProps {
  dispatch: Function;
}

class IacUngroup extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "ungroup",
      this.onUngroup,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onUngroup = (type: AppEventType, placements: Placement[]) => {
    if (
      !placements ||
      placements.length !== 1 ||
      placements[0].type !== "group"
    ) {
      throw new Error("payload not suitable");
    }

    const group = placements[0];
    if (group instanceof GraphicGroup) {
      const items = group.children;

      this.props.dispatch(
        cudElementAction("placement", items, undefined, group),
      );
    }
  };

  render() {
    return null;
  }
}

export default connect()(IacUngroup);
