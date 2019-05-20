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
  selectedPlacementIds: string[];
  // selectedPaperItems: Paper.Item[];
  // selectedItems: Placement[];
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
      prevProps.selectedPlacementIds !==
        this.props.selectedPlacementIds ||
      prevProps.items !== this.props.items
    ) {
      this.selectedPlacement = null;

      const newPlacements = this.getPlacementsById(
        this.props.selectedPlacementIds,
      ).filter(p => !!p);
      if (newPlacements.length === 1) {
        const placement = newPlacements[0];
        if (placement) {
          this.selectedPlacement = placement;
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
    }
  }

  private async updatePlacement(placement: Placement) {
    if (placement) {
      await this.props.dispatch(
        updateElementAction("placement", placement),
      );
    }
  }

  getPlacementsById(ids: string[]): (Placement | undefined)[] {
    return ids.map(id => {
      return this.props.items.find(placement => placement.id === id);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(IacEditItem);
