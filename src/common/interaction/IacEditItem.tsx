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
  selectedItems: Placement[];
  items: Placement[];
}

class IacEditItem extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  selectedPlacement: Placement | null = null;
  editItem: Paper.Item | null = null;
  oldFillColor: string | Paper.Color | null = null;
  editing: boolean = false;
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

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.selectedPaperItems !== this.props.selectedPaperItems
    ) {
      // de-select prev item
      if (prevProps.selectedPaperItems.length > 0) {
        const oldItem = prevProps.selectedPaperItems[0];
        const oldPlacement = this.getPlacementById(oldItem.data);
        if (oldPlacement) {
          oldPlacement.setSelected(false);
        }
      }
      this.selectedPlacement = null;
      if (this.props.selectedPaperItems.length > 0) {
        // select new item
        const newItem = this.props.selectedPaperItems[0];
        const newPlacement = this.getPlacementById(newItem.data);
        if (newPlacement) {
          this.selectedPlacement = newPlacement;
          newPlacement.setSelected(true);
        }
      }
    }

    if (prevProps.selectedItems !== this.props.selectedItems) {
      this.selectedPlacement = null;
      if (this.props.selectedItems.length > 0) {
        const item = this.props.selectedItems[0];
        this.selectedPlacement = item;
        item.setSelected(true);
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
      this.editItem.fillColor = configuration.gripDragFillColor;
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
          this.startEdit();
          // switch off grips during moving the item
          this.selectedPlacement.setSelected(false);
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

    if (this.editing && this.selectedPlacement) {
      this.updatePlacement(this.selectedPlacement);
      this.editing = false;
    }
  };

  startEdit() {
    if (!this.editing && this.selectedPlacement) {
      // create a copy before editing
      this.selectedPlacement.setSelected(false);
      this.editing = true;
      const copyPlacement: Placement = deepClone(
        this.selectedPlacement,
      );
      const oldItem = this.selectedPlacement.getPaperItem();
      const copyItem = copyPlacement.paperDraw();
      if (oldItem && copyItem) {
        oldItem.replaceWith(copyItem);
        this.selectedPlacement = copyPlacement;
        this.selectedPlacement.setSelected(true);
      }

      // if (this.editItem) {
      //   // update this.editItem, because we just made a copy with new grip-items
      //   if (this.modus == "grip") {
      //     const gripId = this.editItem.data;
      //     const copyGridItem = this.selectedPlacement
      //       .getGrips()
      //       .find(g => g.data == gripId);
      //     if (copyGridItem) {
      //       this.editItem = copyGridItem;
      //     }
      //   }
      // }
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
    selectedItems: state.graphic.selectedItems,
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(IacEditItem);
