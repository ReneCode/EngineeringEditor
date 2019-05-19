import React from "react";
import Paper from "paper";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import { IGlobalState } from "../../reducers";

interface IProps {
  items: Placement[];
}

class IacDrawCanvas extends React.Component<IProps> {
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.items !== this.props.items) {
      // console.log("draw canvas", this.props.items.length);
      this.drawCanvas(Paper.project, this.props.items);
    }
  }

  drawCanvas = (project: Paper.Project, items: Placement[]) => {
    project.activeLayer.removeChildren();
    items.forEach(placement => {
      placement.paperDraw();
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(IacDrawCanvas);
