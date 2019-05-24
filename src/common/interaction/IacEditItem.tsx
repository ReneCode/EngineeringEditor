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
import ResizeBox from "./ResizeBox";

interface IProps {
  dispatch: Function;
  selectedPlacementIds: string[];
  items: Placement[];
}

class IacEditItem extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  selectedPlacements: Placement[] = [];
  editItem: Paper.Item | null = null;
  oldFillColor: string | Paper.Color | null = null;
  editing: boolean = false;
  resizeBox: ResizeBox = new ResizeBox();
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
      console.log(
        "update edit.items: ",
        this.props.selectedPlacementIds,
      );
      // remove old selection
      const oldSelectedPlacements = this.getPlacementsById(
        prevProps.selectedPlacementIds,
      );
      oldSelectedPlacements.forEach(p => {
        if (p) {
          p.setSelected(false);
        }
      });
      this.resizeBox.remove();

      this.selectedPlacements = [];
      const newSelectedPlacements = this.getPlacementsById(
        this.props.selectedPlacementIds,
      ).filter(p => !!p);
      if (newSelectedPlacements.length === 1) {
        const placement = newSelectedPlacements[0];
        if (placement) {
          this.selectedPlacements = [placement];
          placement.setSelected(true);
        }
      }
      if (newSelectedPlacements.length > 1) {
        const paperItems: Paper.Item[] = [];
        for (let placement of newSelectedPlacements) {
          if (placement) {
            placement.setSelected(true);
            const paperItem = placement.getPaperItem();
            if (paperItem) {
              paperItems.push(paperItem);
            }
            this.selectedPlacements.push(placement);
          }
        }
        this.resizeBox.create(paperItems);
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
    const len = this.selectedPlacements.length;
    if (this.editItem && len > 0) {
      switch (this.modus) {
        case "grip":
          if (len === 1) {
            this.startEdit();
            this.selectedPlacements[0].dragGrip(event, this.editItem);
            return "stop";
          }
          break;

        case "item":
          this.startEdit();
          for (let placement of this.selectedPlacements) {
            placement.dragItem(event);
          }
          return "stop";
          break;
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

    if (this.editing && this.selectedPlacements.length > 0) {
      this.updatePlacement(this.selectedPlacements);
      this.editing = false;
    }
  };

  startEdit() {
    if (!this.editing && this.selectedPlacements.length > 0) {
      console.log("startEdit");
      // create a copy before editing
      this.editing = true;
      let newSelectedPlacements = [];
      for (let placement of this.selectedPlacements) {
        placement.setSelected(false);
        const copyPlacement: Placement = deepClone(placement);
        const oldItem = placement.getPaperItem();
        const copyItem = copyPlacement.paperDraw();
        if (oldItem && copyItem) {
          oldItem.replaceWith(copyItem);
          placement = copyPlacement;
          newSelectedPlacements.push(placement);
          placement.setSelected(true);
        }
      }
      this.selectedPlacements = newSelectedPlacements;
    }
  }

  private async updatePlacement(placements: Placement[]) {
    await this.props.dispatch(
      updateElementAction("placement", placements),
    );
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
