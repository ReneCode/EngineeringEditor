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

class IacCreateGroup extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "createGroup",
      this.onCreateGroup,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onCreateGroup = (type: AppEventType, payload: IPayload) => {
    if (
      !payload ||
      !payload.placements ||
      payload.placements.length <= 1
    ) {
      throw new Error("payload not suitable");
    }

    const group = new GraphicGroup(payload.placements);

    // const editPlacements = payload.placements.map(p => deepClone(p));
    // for (let placement of editPlacements) {
    // }

    this.props.dispatch(
      deleteElementAction("placement", payload.placements),
    );
    this.props.dispatch(createElementAction("placement", group));
  };

  render() {
    return null;
  }
}

export default connect()(IacCreateGroup);
