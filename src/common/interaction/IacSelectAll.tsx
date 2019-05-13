import React from "react";
import Paper from "paper";
import { setSelectedPaperItems } from "../../actions/graphicActions";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import ResizeBox from "./ResizeBox";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import Placement from "../../model/Placement";
import { itemGetMetaData } from "../ItemMetaData";

interface IProps {
  dispatch: Function;
  items: Placement[];
}

class IacSelectPaperItem extends React.Component<IProps> {
  unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "selectAll",
      () => {
        console.log("selectAll");
        const paperItems = Paper.project.activeLayer.children;
        this.props.dispatch(setSelectedPaperItems(paperItems));
      },
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
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

// { withRef: true }, // to get reference in GraphicView   this.ref = com.getWrappedInstance()
