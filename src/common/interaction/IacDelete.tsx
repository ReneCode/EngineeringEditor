import React from "react";
import { connect } from "react-redux";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import { IGlobalState } from "../../reducers";
import { deleteElementAction } from "../../actions/changeElementActions";
import Placement from "../../model/Placement";

interface IProps {
  dispatch: any;
  items: Placement[];
  selectedPlacementIds: string[];
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
    const placements = this.props.items.filter(placement => {
      const id: string = placement.id as string;
      return this.props.selectedPlacementIds.includes(id);
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
    selectedPlacementIds: state.graphic.selectedPlacementIds,
  };
};

export default connect(mapStateToProps)(IacDelete);
