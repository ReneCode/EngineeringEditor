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

interface IProps {
  dispatch: Function;
  selectedPlacementIds: string[];
}

class IacSelectPaperItem extends React.Component<IProps> {
  unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "mouseDown",
      this.onMouseDown,
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    let newSelectedPlacementIds: string[] = [];

    const result = PaperUtil.hitTest(event.point);
    if (result) {
      const item = PaperUtil.getHitTestItem(result, ItemName.itemAny);

      if (!item) {
        // other item-type selected
        return;
      }

      const id = item.data;
      if (!id) {
        throw new Error("item with no data (placment-id)");
      }

      const append = event.modifiers.shift;
      if (append) {
        if (this.props.selectedPlacementIds.includes(id)) {
          // allready selected
          // remove that id
          newSelectedPlacementIds = this.props.selectedPlacementIds.filter(
            i => i !== id,
          );
          // but do not remote the last id
          if (newSelectedPlacementIds.length === 0) {
            newSelectedPlacementIds = [id];
          }
        } else {
          newSelectedPlacementIds = [
            ...this.props.selectedPlacementIds,
            id,
          ];
        }
      } else {
        newSelectedPlacementIds = [id];
      }
    }

    this.props.dispatch(
      setSelectedPlacementIds(newSelectedPlacementIds),
    );
  };

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
)(IacSelectPaperItem);
