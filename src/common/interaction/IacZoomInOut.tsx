import React from "react";
import Paper from "paper";

import appEventDispatcher from "../Event/AppEventDispatcher";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/reducers";

interface IProps {
  selectedPlacementIds: string[];
}

class IacZoomInOut extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("zoomIn", this.zoomInHandler),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("zoomOut", this.zoomOutHandler),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  zoomInHandler = (center: Paper.Point) => {
    Paper.view.scale(1.2, this.getCenter(center));
  };

  zoomOutHandler = (center: Paper.Point) => {
    if (!center) {
      center = Paper.view.center;
    }
    Paper.view.scale(0.8, center);
  };

  getCenter = (center: Paper.Point): Paper.Point => {
    if (center) {
      return center;
    }

    if (this.props.selectedPlacementIds.length === 0) {
      return Paper.view.center;
    }

    return Paper.view.center;

    // // get center from selected items
    // const items: Paper.Item[] = [];
    // const ids = this.props.selectedPlacementIds;
    // for (let item of Paper.project.activeLayer.children) {
    //   if (ids.includes(item.data)) {
    //     items.push(item);
    //   }
    // }
    // if (items.length === 0) {
    //   return Paper.view.center;
    // }
    // let bbox = items[0].bounds;
    // for (let item of items) {
    //   bbox = bbox.unite(item.bounds);
    // }
    // return bbox.center;
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
  };
};

export default connect(mapStateToProps)(IacZoomInOut);
