import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Placement from "../../model/Placement";
import { AppEventType } from "../Event/AppEventType";
import deepClone from "../deepClone";
import { connect } from "react-redux";
import { updateElementAction } from "../../actions/changeElementActions";

interface IPayload {
  placements: Placement[];
  changes: ({ property: string; value: any })[];
}

interface IProps {
  dispatch: Function;
}

class IacChangeProperty extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "changeProperty",
      this.onChangeProperty,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onChangeProperty = (type: AppEventType, payload: IPayload) => {
    if (!payload || !payload.placements || !payload.changes) {
      throw new Error("payload missing");
    }

    const editPlacements = payload.placements.map(p => deepClone(p));
    for (let placement of editPlacements) {
      for (let change of payload.changes) {
        placement[change.property] = change.value;
      }
    }
    this.props.dispatch(
      updateElementAction("placement", editPlacements),
    );
  };

  render() {
    return null;
  }
}

export default connect()(IacChangeProperty);
