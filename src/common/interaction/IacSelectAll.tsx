import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import appEventDispatcher from "../Event/AppEventDispatcher";
import Placement from "../../model/Placement";
import { setSelectedPlacementIds } from "../../actions/graphicActions";

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
        const paperItems = Paper.project.activeLayer.children;
        const ids = paperItems
          .map(item => {
            const id = item.data;
            if (id) {
              return id;
            }
            return null;
          })
          .filter(id => !!id);
        this.props.dispatch(setSelectedPlacementIds(ids));
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
