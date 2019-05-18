import React from "react";

import Paper from "paper";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";
import configuration from "../configuration";
import { updateElementAction } from "../../actions/changeElementActions";
import appEventDispatcher from "../Event/AppEventDispatcher";
import deepClone from "../deepClone";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
  items: Placement[];
}

class IacEditGrips extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  selectedPlacement: Placement | null = null;
  editItem: Paper.Item | null = null;
  oldFillColor: string | Paper.Color | null = null;
  edited: boolean = false;
  modus: "grip" | "item" | null = null;

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
      // de-select prev item
      if (this.props.selectedPaperItems.length > 0) {
        const oldItem = this.props.selectedPaperItems[0];
        const oldPlacement = this.getPlacementById(oldItem.data);
        if (oldPlacement) {
          oldPlacement.setSelected(false);
        }
      }
      this.selectedPlacement = null;
      if (newProps.selectedPaperItems.length > 0) {
        // select new item
        const newItem = newProps.selectedPaperItems[0];
        const newPlacement = this.getPlacementById(newItem.data);
        if (newPlacement) {
          this.selectedPlacement = newPlacement;
          newPlacement.setSelected(true);
        }
      }
    }
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    const result = PaperUtil.hitTest(event.point);
    if (!result) {
      return;
    }

    this.editItem = PaperUtil.getHitTestItem(result, ItemName.grip);
    if (this.editItem) {
      this.modus = "grip";
      this.oldFillColor = this.editItem.fillColor;
      this.editItem.fillColor = configuration.gripMoveFillColor;
      return;
    }

    this.editItem = PaperUtil.getHitTestItem(
      result,
      ItemName.itemAny,
    );
    if (this.editItem) {
      this.modus = "item";
      return;
    }
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.editItem && this.selectedPlacement) {
      switch (this.modus) {
        case "grip":
          this.startEdit();
          this.selectedPlacement.dragGrip(event, this.editItem);
          return "stop";

        case "item":
          // switch off grips during moving the item
          this.selectedPlacement.setSelected(false);
          this.startEdit();
          this.selectedPlacement.dragItem(event, this.editItem);
          return "stop";
      }
    }
  };

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    switch (this.modus) {
      case "grip":
        if (this.editItem) {
          this.editItem.fillColor = this.oldFillColor;
        }
        break;
    }

    if (this.edited && this.selectedPlacement) {
      this.updatePlacement(this.selectedPlacement);
      this.edited = false;
    }
  };

  startEdit() {
    if (!this.edited && this.selectedPlacement) {
      this.edited = true;
      const copyPlacement: Placement = deepClone(
        this.selectedPlacement,
      );
      const oldItem = this.selectedPlacement.getPaperItem();
      const copyItem = copyPlacement.paperDraw();
      if (oldItem && copyItem) {
        oldItem.replaceWith(copyItem);
        this.selectedPlacement = copyPlacement;
      }
    }
  }

  private async updatePlacement(placement: Placement) {
    if (placement) {
      await this.props.dispatch(
        updateElementAction("placement", placement),
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

export default connect(mapStateToProps)(IacEditGrips);
