import React from "react";
import Paper from "paper";
import { setSelectedPlacementIds } from "../../actions/graphicActions";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/reducers";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";
import { concatUnique } from "../../utils/concatUnique";
import configuration from "../configuration";
import containsTheSame from "../../utils/containsTheSame";
import { DrawMode } from "../../model/Placement";

interface IProps {
  dispatch: Function;
  selectedPlacementIds: string[];
}

class IacSelect extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  addedId: string = "";
  modus: "" | "boxselect" = "";
  selectionBox: null | Paper.Item = null;
  selectedIds: string[] = [];
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  boundingBox: Paper.Item = new Paper.Item();
  canDrag: boolean = false;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );

    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );

    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  /*
    TODO: (see on whimsical)
    mouseDown => add to selection
    mouseUp => remove from selection (if it was already selected on mouseDown)
                do not remove, when dragEvent was before mouseUp
  */
  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.modus === "boxselect") {
      this.modus = "";
      this.removeSelectionBox();
      if (
        this.props.selectedPlacementIds.length !==
        this.selectedIds.length
      ) {
        this.dispatchSetSelectedPlacementIds(this.selectedIds);
      }
      this.boundingBox.remove();
      return;
    }

    const id = this.getHitItemPlacementId(event.point);
    if (!id) {
      return;
    }
    console.log(":", this.modus);

    if (event.modifiers.shift) {
      if (this.addedId !== id) {
        const newSelectedPlacementIds = this.props.selectedPlacementIds.filter(
          i => i !== id,
        );

        // but do not remote the last id
        if (newSelectedPlacementIds.length > 0) {
          this.dispatchSetSelectedPlacementIds(
            newSelectedPlacementIds,
          );
        }
      }
    }
  };

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    this.addedId = "";

    this.modus = "";
    const result = PaperUtil.hitTest(event.point);
    this.canDrag = false;
    if (!result) {
      this.canDrag = true;
      this.selectionBox = null;
      this.firstPoint = event.point;

      if (event.modifiers.shift) {
        return;
      }
      // nothing selected - remove selection
      if (this.props.selectedPlacementIds.length > 0) {
        this.dispatchSetSelectedPlacementIds([]);
      }
      return;
    } else {
      const item = PaperUtil.getHitTestItem(result, ItemName.itemAny);
      if (!item) {
        // other item-type selected
        // do nothing
        return;
      }

      const id = item.data;
      if (!id) {
        throw new Error("item with no data (placment-id)");
      }

      if (this.props.selectedPlacementIds.includes(id)) {
        // allready selected
        // do nothing
        return;
      }

      this.addedId = id;
      let newIds: string[] = [];
      const append = event.modifiers.shift;
      if (append) {
        newIds = concatUnique<string>(
          this.props.selectedPlacementIds,
          id,
        );
      } else {
        newIds = [id];
      }
      this.dispatchSetSelectedPlacementIds(newIds);
    }
  };

  dispatchSetSelectedPlacementIds(ids: string[]) {
    this.setModeToPlacements(this.props.selectedPlacementIds, null);
    this.setModeToPlacements(ids, "highlight");

    this.props.dispatch(setSelectedPlacementIds(ids));
  }

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (!this.canDrag) {
      return;
    }
    this.modus = "boxselect";

    this.crateSelectionBox(event.point);
    const allreadySelectedItems = PaperUtil.getPlacementsById(
      this.props.selectedPlacementIds,
    ).map(p => p.getPaperItem());
    const items = this.collectPaperItemsInSelectionBox().concat(
      allreadySelectedItems,
    );

    const newSelecteIds = items.map(item => item.data);
    if (containsTheSame(newSelecteIds, this.selectedIds)) {
      return;
    }

    this.drawBoundingBox(items);
    this.setModeToPlacements(this.selectedIds, null);
    this.setModeToPlacements(newSelecteIds, "highlight");
    this.selectedIds = newSelecteIds;
  };

  private setModeToPlacements(ids: string[], drawMode: DrawMode) {
    const placements = PaperUtil.getPlacementsById(ids);
    for (let placement of placements) {
      placement.setMode(drawMode);
    }
  }

  private crateSelectionBox(p2: Paper.Point) {
    const selectionRect = new Paper.Rectangle(this.firstPoint, p2);
    const box = new Paper.Path.Rectangle(selectionRect);
    box.strokeColor = configuration.selectionBoxStrokeColor;
    box.fillColor = configuration.selectionBoxFillColor;
    box.strokeWidth = 0.5;
    if (this.selectionBox) {
      this.selectionBox.remove();
    }
    this.selectionBox = box;
  }

  private removeSelectionBox() {
    if (this.selectionBox) {
      this.selectionBox.remove();
      this.selectionBox = null;
    }
  }

  private collectPaperItemsInSelectionBox(): Paper.Item[] {
    const items: Paper.Item[] = [];
    if (this.selectionBox) {
      const selectionRect = this.selectionBox.bounds;

      const project = Paper.project;
      for (let item of project.activeLayer.children) {
        if (
          item.isInside(selectionRect) ||
          item.intersects(this.selectionBox)
        ) {
          if (ItemName.match(ItemName.itemAny, item.name)) {
            items.push(item);
          }
        }
      }
    }
    return items;
  }

  private drawBoundingBox(items: Paper.Item[]) {
    if (this.boundingBox) {
      this.boundingBox.remove();
    }
    if (items.length === 0) {
      return;
    }
    let bbox = items[0].bounds;
    for (let item of items) {
      bbox = bbox.unite(item.bounds);
    }

    this.boundingBox = new Paper.Path.Rectangle(bbox);
    this.boundingBox.name = ItemName.resizeBox;
    this.boundingBox.strokeColor =
      configuration.boundingBoxStrokeColor;
  }

  getHitItemPlacementId(point: Paper.Point): string | null {
    const result = PaperUtil.hitTest(point);
    if (!result) {
      return null;
    }
    let item = PaperUtil.getHitTestItem(result, ItemName.itemAny);
    if (!item) {
      return null;
    }

    const id = item.data;
    if (!id) {
      throw new Error("item with no data (placment-id)");
    }
    return id;
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
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
)(IacSelect);
