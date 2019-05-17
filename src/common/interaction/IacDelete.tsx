import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { IGlobalState } from "../../reducers";
import { itemGetMetaData } from "../ItemMetaData";
import { deleteElementAction } from "../../actions/changeElementActions";
import Placement from "../../model/Placement";

interface IProps {
  dispatch: any;
  items: Placement[];
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
    console.log("delete:", this.props.selectedPaperItems);
    const placements = this.props.selectedPaperItems.map(item => {
      const data = item.data;
      if (data && data.placement) {
        return data.placement;
      }

      return this.props.items.find(pl => pl.id == data) as Placement;
    });

    this.props.dispatch(deleteElementAction("placement", placements));
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
    selectedPaperItems: state.graphic.selectedPaperItems,
  };
};

export default connect(mapStateToProps)(IacDelete);
