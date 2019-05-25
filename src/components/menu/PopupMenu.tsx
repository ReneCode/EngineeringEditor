import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";

interface IProps {
  selectedPlacementIds: string[];
  items: Placement[];
}

class PopupMenu extends React.Component<IProps> {
  render() {
    if (this.props.selectedPlacementIds.length !== 1) {
      return null;
    }

    const id = this.props.selectedPlacementIds[0];
    const placement = this.props.items.find(
      placement => placement.id === id,
    );
    if (!placement) {
      return null;
    }

    const item = placement.getPaperItem();
    if (!item) {
      return null;
    }

    const itemPoint = item.bounds.topLeft;
    const viewPoint = Paper.view.projectToView(itemPoint);

    const popMenuHeight = 50;
    const gap = 10;

    const style = {
      top: viewPoint.y - popMenuHeight - gap,
      left: viewPoint.x,
    };

    return (
      <div className="html-canvas">
        <div className="popup-menu" style={style}>
          <button>1</button>
          <button>2</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(PopupMenu);
