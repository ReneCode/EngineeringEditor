import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import { ItemName } from "../../common/ItemMetaData";
import PaperUtil from "../../utils/PaperUtil";
import DrawToolbar from "../GraphicView/DrawToolbar";
import Toolbar, { ToolbarItemDef } from "../GraphicView/Toolbar";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

interface IProps {
  selectedPlacementIds: string[];
  items: Placement[];
}

class PopupMenu extends React.Component<IProps> {
  render() {
    const id = this.props.selectedPlacementIds[0];
    const [placement] = PaperUtil.getPlacementsById([id]);
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
      position: "absolute",

      top: viewPoint.y - popMenuHeight - gap,
      left: viewPoint.x,
    };

    const items: ToolbarItemDef[] = [
      {
        text: "S",
        onClick: () => {
          appEventDispatcher.dispatch("stopInteraction");
        },
      },
      {
        text: "C",
        onClick: () => {
          appEventDispatcher.dispatch(
            "startInteraction",
            "CreateArc",
          );
        },
      },
      {
        text: "L",
        onClick: () => {
          appEventDispatcher.dispatch(
            "startInteraction",
            "CreateLine",
          );
        },
      },
    ];

    return (
      <div className="html-canvas">
        <Toolbar className="" style={style}>
          <button onClick={() => alert("it works")}>6</button>
          <button>7</button>
          <button>8</button>
        </Toolbar>
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
