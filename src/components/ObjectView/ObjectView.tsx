import React, { Component } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import Placement from "../../model/Placement";
import PlacementView from "./PlacementView";

interface IProps {
  selectedObjectType: string;
  selectedItems: Placement[];
}

class ObjectView extends Component<IProps> {
  render() {
    let component = null;

    if (this.props.selectedItems.length > 0) {
      component = <PlacementView items={this.props.selectedItems} />;
    }
    return (
      <div className="ObjectView">
        <div className="scrolling">{component}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedObjectType: state.environment.selectedObjectType,
    selectedItems: state.graphic.selectedItems,
  };
};

export default connect(mapStateToProps)(ObjectView);
