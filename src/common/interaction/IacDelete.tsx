import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { AppEventType } from "../../common/Event/AppEventType";
import { undoAction, redoAction } from "../../actions/undoRedo";
import { IGlobalState } from "../../reducers";
import { itemGetMetaData } from "../ItemMetaData";
import { deleteElementAction } from "../../actions/changeElementActions";

interface IProps {
  dispatch: any;
  selectedPaperItems: Paper.Item[];
}

class IacDelete extends React.Component<IProps> {
  private unsubscribeFn: any;

  componentDidMount() {
    this.unsubscribeFn = appEventDispatcher.subscribe(
      "delete",
      this.onDelete,
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn();
  }

  onDelete = () => {
    const placements = this.props.selectedPaperItems.map(item => {
      const metaData = itemGetMetaData(item);
      if (!metaData) {
        throw new Error("metaData missing on item:" + item);
      }
      return metaData.placement;
    });

    this.props.dispatch(deleteElementAction("placement", placements));
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

export default connect(mapStateToProps)(IacDelete);
