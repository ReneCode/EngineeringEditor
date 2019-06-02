import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Placement from "../../model/Placement";
import { AppEventType } from "../Event/AppEventType";
import deepClone from "../deepClone";
import { connect } from "react-redux";
import {
  updateElementAction,
  createElementAction,
  deleteElementAction,
} from "../../actions/changeElementActions";
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

    console.log("ungroup: do something useful");
  };

  render() {
    return null;
  }
}

export default connect()(IacUngroup);
