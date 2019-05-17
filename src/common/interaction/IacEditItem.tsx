import React from "react";

import Paper from "paper";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import GraphicArc from "../../model/graphic/GraphicArc";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";
import configuration from "../configuration";

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

  constructor(props: any) {
    super(props);

    this.onEditItem = this.onEditItem.bind(this);
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
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("editItem", this.onEditItem),
    );
    // this.unsubscribeFn.push(
    //   appEventDispatcher.subscribe("selectItem", this.onSelectItem),
    // );
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
    }
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    this.gripItem = PaperUtil.hitTestItem(event.point, ItemName.grip);
    if (this.gripItem) {
      this.oldFillColor = this.gripItem.fillColor;
      this.gripItem.fillColor = configuration.gripMoveFillColor;
    }
  };

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {};

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.gripItem && this.placement) {
      this.placement.dragGrip(event, this.gripItem);
    }
  };

  onMouseUp = async (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.gripItem) {
      this.gripItem.fillColor = this.oldFillColor;
    }
  };

  onEditItem = (type: AppEventType, item: Paper.Item) => {
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
    console.log("edit item:", item.name, item.data, item.id);
    const placement = this.getPlacementById(item.data);
    if (!placement) {
      throw new Error("EditItem, item has no placement");
    }

    if (this.placement) {
      this.placement.removeGrips();
    }

    this.item = item;
    this.placement = placement as GraphicArc;

    this.placement.showGrips();
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
