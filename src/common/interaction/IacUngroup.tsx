import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Placement from "../../model/Placement";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";
import { cudElementAction } from "../../actions/changeElementActions";
import GraphicGroup from "../../model/graphic/GraphicGroup";

interface IPayload {
  placements: Placement[];
}

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

  onUngroup = (type: AppEventType, payload: IPayload) => {
    if (
      !payload ||
      !payload.placements ||
      payload.placements.length !== 1 ||
      payload.placements[0].type !== "group"
    ) {
      throw new Error("payload not suitable");
    }

    const group = payload.placements[0];
    if (group instanceof GraphicGroup) {
      const items = group.children;

      this.props.dispatch(
        cudElementAction("placement", {
          create: items,
          delete: group,
        }),
      );
    }
  };

  render() {
    return null;
  }
}

export default connect()(IacUngroup);
