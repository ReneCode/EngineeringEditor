import React from "react";

import Paper from "paper";
import Placement, { DrawMode } from "../../model/Placement";
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
import { debug } from "util";

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

      const placements = PaperUtil.getPlacementsById(
        this.props.selectedPlacementIds,
      );
      console.log("new Placements:", placements);
      if (placements.length === 1) {
        placements[0].setMode("edit");
      }
      if (placements.length > 1) {
        for (let placement of placements) {
          placement.setMode("select");
        }
      }

      /*

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
    */
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
          break;

        case "item":
          this.startEdit("select");
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
      // if (len > 1) {
      //   this.resizeBox.remove();
      // }

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

  // private getPlacementsById(ids: string[]): Placement[] {
  //   let placements: Placement[] = [];
  //   for (let id of ids) {
  //     const placement = this.props.items.find(
  //       placement => placement.id === id,
  //     );
  //     if (placement) {
  //       placements.push(placement);
  //     }
  //   }
  //   return placements;
  // }

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
