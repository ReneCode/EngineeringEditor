import React from "react";
import Paper from "paper";
import { setSelectedPaperItems } from "../../actions/graphicActions";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import ResizeBox from "./ResizeBox";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
}

class IacSelectPaperItem extends React.Component<IProps> {
  unsubscribeFn: any;

  constructor(props: any) {
    super(props);

    this.onSelectPaperItem = this.onSelectPaperItem.bind(this);
  }

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "selectPaperItem",
      this.onSelectPaperItem,
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onSelectPaperItem = (
    event: AppEventType,
    payload: { item: Paper.Item; append: boolean },
  ) => {
    if (!payload || !payload.item) {
      this.props.dispatch(setSelectedPaperItems([]));
      return;
    }

    console.table(payload.append);
    const item = payload.item;
    if (this.props.selectedPaperItems.includes(item)) {
      return;
    }
    if (payload.append) {
      // debugger;
      this.props.dispatch(
        setSelectedPaperItems([
          ...this.props.selectedPaperItems,
          item,
        ]),
      );
    } else {
      this.props.dispatch(setSelectedPaperItems(item));
    }
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
