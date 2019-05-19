import React from "react";
import Paper from "paper";
import {
  setSelectedPaperItems,
  setSelectedItemAction,
} from "../../actions/graphicActions";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";
import Placement from "../../model/Placement";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
  items: Placement[];
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
    let newSelectedPaperItems: Paper.Item[] = [];
    let newSelectedPlacements: Placement[] = [];
    const result = PaperUtil.hitTest(event.point);
    if (result) {
      const item = PaperUtil.getHitTestItem(result, ItemName.itemAny);

      if (!item) {
        // other item-type selected
        return;
      }
      if (
        PaperUtil.includeWithSameData(
          this.props.selectedPaperItems,
          item,
        )
      ) {
        return;
      }

      console.log("items:", item.data);

      const append = event.modifiers.shift;
      if (append) {
        newSelectedPaperItems = [
          ...this.props.selectedPaperItems,
          item,
        ];
      } else {
        newSelectedPaperItems.push(item);
      }

      newSelectedPlacements = this.props.items.filter(placement => {
        const id = placement.id;
        if (newSelectedPaperItems.find(i => i.data === id)) {
          return true;
        } else {
          return false;
        }
      });
    }
    this.props.dispatch(setSelectedPaperItems(newSelectedPaperItems));
    this.props.dispatch(setSelectedItemAction(newSelectedPlacements));
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPaperItems: state.graphic.selectedPaperItems,
    items: state.graphic.items,
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
