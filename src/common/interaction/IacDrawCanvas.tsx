import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import { IGlobalState } from "../../reducers";
import { setSelectedPaperItems } from "../../actions/graphicActions";

interface IProps {
  items: Placement[];
  // selectedItems: Placement[];
  selectedPlacementIds: string[];
  dispatch: Function;
}

class IacDrawCanvas extends React.Component<IProps> {
  componentDidUpdate(prevProps: any, prevState: any) {
    // if (prevProps.items !== this.props.items) {
    // console.log("draw canvas", this.props.items.length);
    this.drawCanvas(Paper.project, this.props.items);
    this.setSelectedPaperItems(this.props.items);
    // }
  }

  drawCanvas = (project: Paper.Project, items: Placement[]) => {
    console.log("draw Canvas:", items.length);
    project.activeLayer.removeChildren();
    items.forEach(placement => {
      placement.paperDraw();
    });
  };

  private setSelectedPaperItems = (items: Placement[]) => {
    const selectedPaperItems: Paper.Item[] = [];
    this.props.items.forEach(placement => {
      const id = placement.id;
      const selItem = this.props.selectedPlacementIds.find(
        i => i === id,
      );
      if (selItem) {
        placement.setSelected(true);
        // const paperItem = placement.getPaperItem();
        // if (paperItem) {
        //   selectedPaperItems.push(paperItem);
        // }
      }
    });
    // this.props.dispatch(setSelectedPaperItems(selectedPaperItems));
    // console.log("selectedItems:", this.props.selectedItems);
  };

  render() {
    return null;
  }
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    dispatch: (e: any) => dispatch(e),
  };
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
    selectedPlacementIds: state.graphic.selectedPlacementIds,
    // selectedItems: state.graphic.selectedItems,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IacDrawCanvas);
