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

interface IProps {
  dispatch: Function;
  selectedPlacementIds: string[];
}

class IacSelect extends React.Component<IProps> {
  unsubscribeFn: any;
  addedId: string = "";

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "mouseDown",
      this.onMouseDown,
    );

    this.unsubscribeFn = appEventDispatcher.subscribe(
      "mouseUp",
      this.onMouseUp,
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

    const result = PaperUtil.hitTest(event.point);
    if (!result) {
      // nothing selected - remove selection
      newSelectedPlacementIds = [];
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
