import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import { IGlobalState } from "../../reducers";
import { setSelectedPaperItems } from "../../actions/graphicActions";
import configuration from "../configuration";
import appEventDispatcher from "../Event/AppEventDispatcher";

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

    // this.drawCanvas(Paper.project, this.props.items);

    appEventDispatcher.dispatch("didDrawCanvas");

    // this.setSelectedPaperItems(this.props.items);
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
    const selectedPlacements = this.props.items.filter(placement => {
      const id = placement.id;
      return this.props.selectedPlacementIds.find(i => i === id);
    });

    // appEventDispatcher.dispatch(
    //   "selectedPlacements",
    //   selectedPlacements,
    // );

    if (selectedPlacements.length === 1) {
      selectedPlacements[0].setSelected(true);
    }
    if (selectedPlacements.length >= 2) {
      // const group = new Paper.Group();
      // selectedPlacements.forEach(p => {
      //   const paperItem = p.getPaperItem();
      //   if (paperItem) {
      //     group.addChild(paperItem);
      //   }
      // });
      const paperItem = selectedPlacements[0].getPaperItem();
      if (paperItem) {
        const rect = new Paper.Path.Rectangle(paperItem.bounds);
        rect.strokeColor = configuration.boundingBoxStrokeColor;
      }
    }
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
