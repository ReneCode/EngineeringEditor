import React from "react";

import Paper, { Point } from "paper";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import GraphicArc from "../../model/graphic/GraphicArc";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";
import configuration from "../configuration";
import { updateElementAction } from "../../actions/changeElementActions";
import deepClone from "../deepClone";

interface IProps {
  dispatch: Function;
  items: Placement[];
  selectedPaperItems: Paper.Item[];
}

class IacEditItem extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  item: Paper.Item | null = null;
  placement: GraphicArc | null = null;
  gripItem: Paper.Item | null = null;
  oldFillColor: string | Paper.Color | null = null;
  modified: boolean = false;

  constructor(props: any) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
  }
  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
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

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.selectedPaperItems !== this.props.selectedPaperItems
    ) {
      if (this.placement) {
        this.placement.removeGrips();
      }
      this.item = null;
      this.placement = null;
      this.modified = false;
    }
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    const result = PaperUtil.hitTest(event.point);
    if (!result) {
      return;
    }

    this.gripItem = PaperUtil.getHitTestItem(result, ItemName.grip);
    if (this.gripItem) {
      console.log("grip");
      this.oldFillColor = this.gripItem.fillColor;
      this.gripItem.fillColor = configuration.gripMoveFillColor;
      return;
    }

    const item = PaperUtil.getHitTestItem(result, ItemName.itemAny);
    if (item) {
      if (
        PaperUtil.includeWithSameData(
          this.props.selectedPaperItems,
          item,
        )
      ) {
        // click on a selected item => edit it
        this.editItem(item);
      }
      return;
    }
  };

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {};

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.gripItem && this.placement) {
      this.modified = true;
      this.placement.dragGrip(event, this.gripItem);
      return "stop";
    }
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.gripItem) {
      this.gripItem.fillColor = this.oldFillColor;
    }

    if (this.modified && this.placement) {
      this.updatePlacement(this.placement);
      this.modified = false;
    }
  };

  private async updatePlacement(placement: Placement) {
    if (placement) {
      await this.props.dispatch(
        updateElementAction("placement", placement),
      );
    }
  }

  editItem = (item: Paper.Item) => {
    if (!item) {
      if (this.placement) {
        this.placement.removeGrips();
      }
      this.item = null;
      this.placement = null;
      return;
    }
    if (item === this.item) {
      // this item is allready editing
      return;
    }
    const placement = this.getPlacementById(item.data) as GraphicArc;
    if (!placement) {
      throw new Error("EditItem, item has no placement");
    }

    // create copy of placement and update the paper item
    const copyPlacement = deepClone(placement) as GraphicArc;
    const copyItem = copyPlacement.paperDraw();
    const oldItem = placement.getPaperItem();

    if (oldItem) {
      oldItem.replaceWith(copyItem);
    }
    this.item = copyItem;
    this.placement = copyPlacement;
    // this.placement.showGrips();
  };

  private getPlacementById(id: string): Placement | undefined {
    return this.props.items.find(placement => placement.id === id);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
    selectedPaperItems: state.graphic.selectedPaperItems,
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
)(IacEditItem);

// { withRef: true }, // to get reference in GraphicView   this.ref = com.getWrappedInstance()
