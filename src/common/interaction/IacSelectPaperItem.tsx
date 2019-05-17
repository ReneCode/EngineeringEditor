import React from "react";
import Paper from "paper";
import { setSelectedPaperItems } from "../../actions/graphicActions";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import ResizeBox from "./ResizeBox";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../ItemMetaData";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
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

      const append = event.modifiers.shift;
      if (append) {
        newSelectedPaperItems = [
          ...this.props.selectedPaperItems,
          item,
        ];
      } else {
        newSelectedPaperItems.push(item);
      }
    }
    this.props.dispatch(setSelectedPaperItems(newSelectedPaperItems));
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPaperItems: state.graphic.selectedPaperItems,
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

// { withRef: true }, // to get reference in GraphicView   this.ref = com.getWrappedInstance()
