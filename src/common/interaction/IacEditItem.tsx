import React from "react";
import { connect } from "react-redux";
import Paper from "paper";

import Placement, { DrawMode } from "../../model/Placement";
import { IGlobalState } from "../../store/reducers";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemName";
import configuration from "../configuration";
import { updateElementAction } from "../../actions/changeElementActions";
import appEventDispatcher from "../Event/AppEventDispatcher";
import ResizeBox from "./ResizeBox";
import { enablePlacementToolbar } from "../../actions/projectActions";
import SnapToGrid from "../SnapToGrid";

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
  snapToGrid = new SnapToGrid();

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
      this.resizeBox.remove();

      const placements = PaperUtil.getPlacementsById(
        this.props.selectedPlacementIds,
      );
      if (placements.length === 1) {
        placements[0].paperDraw("select");
      }
      if (placements.length > 1) {
        for (let placement of placements) {
          placement.paperDraw("highlight");
        }
        const items = placements.map(p => p.getPaperItem());
        this.resizeBox.create(items);
      }
    }
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    this.snapToGrid.startDelta(event.point);

    const result = PaperUtil.hitTest(event.point);
    if (!result) {
      return;
    }

    let hitTestResult = PaperUtil.getHitTestItem(
      result,
      ItemName.grip,
    );
    if (hitTestResult) {
      this.editItem = hitTestResult.itemResult;
      this.modus = "grip";
      this.oldFillColor = this.editItem.fillColor;
      this.editItem.fillColor = configuration.gripDragFillColor;
      return;
    }

    hitTestResult = PaperUtil.getHitTestItem(
      result,
      ItemName.itemAny,
    );
    if (hitTestResult) {
      this.editItem = hitTestResult.itemResult;
      this.modus = "item";
      return;
    }
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    if (this.editItem) {
      const delta = this.snapToGrid.snapDelta(event.point);
      const point = this.snapToGrid.snap(event.point);
      event.delta = delta;
      event.point = point;

      switch (this.modus) {
        case "grip":
          this.startEdit("select");
          this.selectedPlacements[0].dragGrip(event, this.editItem);
          return "stop";

        case "item":
          this.startEdit(null);
          for (let placement of this.selectedPlacements) {
            placement.dragItem(delta);
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
    this.props.dispatch(enablePlacementToolbar(true));
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
        placement.paperDraw(null);
        const newPlacement: Placement = placement.clone();
        const oldItem = placement.getPaperItem();
        const copyItem = newPlacement.paperDraw();
        if (oldItem && copyItem) {
          oldItem.replaceWith(copyItem);
          newSelectedPlacements.push(newPlacement);
          newPlacement.paperDraw(drawMode);
        }
      }
      this.selectedPlacements = newSelectedPlacements;

      this.props.dispatch(enablePlacementToolbar(false));
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
