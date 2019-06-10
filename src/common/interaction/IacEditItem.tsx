import React from "react";
import { connect } from "react-redux";
import Paper from "paper";

import Placement, { DrawMode } from "../../model/Placement";
import { IGlobalState } from "../../store/reducers";
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
  redrawn: number;
}

class IacEditItem extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  selectedPlacements: Placement[] = [];
  editItem: Paper.Item | null = null;
  oldFillColor: string | Paper.Color | null = null;
  editing: boolean = false;
  resizeBox: ResizeBox = new ResizeBox();
  modus: "grip" | "item" | "" = "";

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
      prevProps.redrawn !== this.props.redrawn
    ) {
      const oP = PaperUtil.getPlacementsById(
        prevProps.selectedPlacementIds,
      );
      for (let p of oP) {
        p.setMode(null);
      }
      this.resizeBox.remove();

      const placements = PaperUtil.getPlacementsById(
        this.props.selectedPlacementIds,
      );
      if (placements.length === 1) {
        placements[0].setMode("edit");
      }
      if (placements.length > 1) {
        for (let placement of placements) {
          placement.setMode("select");
        }
        const items = placements.map(p => p.getPaperItem());
        this.resizeBox.create(items);
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
    if (this.editItem) {
      switch (this.modus) {
        case "grip":
          this.startEdit("edit");
          this.selectedPlacements[0].dragGrip(event, this.editItem);
          return "stop";

        case "item":
          this.startEdit("select");
          for (let placement of this.selectedPlacements) {
            placement.dragItem(event);
          }
          return "stop";
      }
    }
  };

  onMouseUp = () => {
    switch (this.modus) {
      case "grip":
        if (this.editItem && this.oldFillColor) {
          this.editItem.fillColor = this.oldFillColor;
        }
        break;
    }

    if (this.editing && this.selectedPlacements.length > 0) {
      this.savePlacement();
      this.editing = false;
    }
    this.modus = "";
  };

  private async savePlacement() {
    await this.props.dispatch(
      updateElementAction("placement", this.selectedPlacements),
    );
  }

  startEdit(drawMode: DrawMode) {
    if (!this.editing) {
      this.resizeBox.remove();
      const placements = PaperUtil.getPlacementsById(
        this.props.selectedPlacementIds,
      );

      // create a copy before editing
      this.editing = true;
      let newSelectedPlacements = [];
      this.selectedPlacements = [];
      for (let placement of placements) {
        placement.setMode(null);
        const newPlacement: Placement = deepClone(placement);
        debugger;
        const oldItem = placement.getPaperItem();
        const copyItem = newPlacement.paperDraw();
        if (oldItem && copyItem) {
          oldItem.replaceWith(copyItem);
          newSelectedPlacements.push(newPlacement);
          newPlacement.setMode(drawMode);
        }
      }
      this.selectedPlacements = newSelectedPlacements;
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
    items: state.graphic.items,
    redrawn: state.graphic.redrawn,
  };
};

export default connect(mapStateToProps)(IacEditItem);
