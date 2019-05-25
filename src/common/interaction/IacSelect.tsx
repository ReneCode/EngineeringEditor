import React from "react";
import Paper from "paper";
import { setSelectedPlacementIds } from "../../actions/graphicActions";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";
import Placement from "../../model/Placement";
import { concatUnique } from "../../utils/concatUnique";
import configuration from "../configuration";

interface IProps {
  dispatch: Function;
  selectedPlacementIds: string[];
}

class IacSelect extends React.Component<IProps> {
  unsubscribeFn: any;
  addedId: string = "";
  modus: "" | "boxselect" = "";
  selectionBox: null | Paper.Item = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "mouseDown",
      this.onMouseDown,
    );

    this.unsubscribeFn = appEventDispatcher.subscribe(
      "mouseUp",
      this.onMouseUp,
    );

    this.unsubscribeFn = appEventDispatcher.subscribe(
      "mouseDrag",
      this.onMouseDrag,
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn();
  }

  /*
    TODO: (see on whimsical)
    mouseDown => add to selection
    mouseUp => remove to selection (if it was already selected on mouseDown)
                do not remove, when dragEvent was before mouseUp
  */
  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.modus === "boxselect") {
      if (this.selectionBox) {
        this.selectionBox.remove();
      }
    }

    const id = this.getHitItemPlacementId(event.point);
    if (!id) {
      return;
    }

    if (event.modifiers.shift) {
      if (this.addedId !== id) {
        const newSelectedPlacementIds = this.props.selectedPlacementIds.filter(
          i => i !== id,
        );

        // but do not remote the last id
        if (newSelectedPlacementIds.length > 0) {
          this.props.dispatch(
            setSelectedPlacementIds(newSelectedPlacementIds),
          );
        }
      }
    }
  };

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    let newSelectedPlacementIds: string[] = [];
    this.addedId = "";

    this.modus = "";
    const result = PaperUtil.hitTest(event.point);
    if (!result) {
      // nothing selected - remove selection
      newSelectedPlacementIds = [];
      this.modus = "boxselect";
      this.selectionBox = null;
      this.firstPoint = event.point;
      this.drawSelectionBox(event.point);
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
      const append = event.modifiers.shift;
      if (append) {
        newSelectedPlacementIds = concatUnique<string>(
          this.props.selectedPlacementIds,
          id,
        );
      } else {
        newSelectedPlacementIds = [id];
      }
    }

    this.props.dispatch(
      setSelectedPlacementIds(newSelectedPlacementIds),
    );
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.modus !== "boxselect") {
      return;
    }
    this.drawSelectionBox(event.point);
  };

  private drawSelectionBox(p2: Paper.Point) {
    const selectionRect = new Paper.Rectangle(this.firstPoint, p2);
    const box = new Paper.Path.Rectangle(selectionRect);
    box.strokeColor = configuration.boundingBoxStrokeColor;
    if (this.selectionBox) {
      this.selectionBox.remove();
    }
    this.selectionBox = box;

    // select items touching that box
    const selectedIds: string[] = [];
    const project = Paper.project;
    for (let item of project.activeLayer.children) {
      if (
        item.isInside(selectionRect) ||
        item.intersects(this.selectionBox)
      ) {
        // if (selectionRect.intersects(item.bounds)) {
        if (item.data) {
          selectedIds.push(item.data);
        } else {
          // # TODO: check that quirky item
        }
      }
    }

    if (
      this.props.selectedPlacementIds.length !== selectedIds.length
    ) {
      this.props.dispatch(setSelectedPlacementIds(selectedIds));
    }
  }

  getHitItemPlacementId(point: Paper.Point): string | null {
    let newSelectedPlacementIds: string[] = [];
    const result = PaperUtil.hitTest(point);
    if (!result) {
      return null;
    }
    const item = PaperUtil.getHitTestItem(result, ItemName.itemAny);
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
