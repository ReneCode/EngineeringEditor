import React from "react";

import Paper from "paper";
import { ItemName } from "../ItemMetaData";
import { updateElementAction } from "../../actions/changeElementActions";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import ResizeBox from "./ResizeBox";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import GraphicArc from "../../model/graphic/GraphicArc";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
  items: Placement[];
}

class IacMove extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  modus: null | "moving" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  handleItem: Paper.Item | null = null;

  hitTestOptions: Paper.IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
  };

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  componentWillUpdate(newProps: IProps) {
    if (
      newProps.selectedPaperItems !== this.props.selectedPaperItems
    ) {
    }
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    this.firstPoint = event.point;
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    // move all items
    this.props.selectedPaperItems.forEach(item => {
      item.position = item.position.add(event.delta);
    });
    this.modus = "moving";
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    if (this.modus === "moving") {
      const moveDelta = event.point.subtract(this.firstPoint);
      placements = this.props.selectedPaperItems.map(item => {
        const placement = this.getPlacementById(item.data);
        if (!placement) {
          throw new Error("placement not found");
        }
        return placement.translate(moveDelta);
      });
    }

    this.modus = null;
    this.updatePlacements(placements);

    this.handleItem = null;
  };

  private async updatePlacements(placements: Placement[]) {
    if (placements.length > 0) {
      await this.props.dispatch(
        updateElementAction("placement", placements),
      );
    }
  }

  getPlacementById(id: string): Placement | undefined {
    return this.props.items.find(placement => placement.id === id);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPaperItems: state.graphic.selectedPaperItems,
    items: state.graphic.items,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    dispatch: (e: any) => dispatch(e),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IacMove);
