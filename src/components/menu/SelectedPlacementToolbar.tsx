import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import PaperUtil from "../../utils/PaperUtil";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import ToolbarButtonFactory from "../menu/ToolbarButtonFactory";
import Toolbar from "../menu/Toolbar";

interface IProps {
  selectedPlacementIds: string[];
  items: Placement[];
}

class SelectedPlacementToolbar extends React.Component<IProps> {
  render() {
    const ids = this.props.selectedPlacementIds;
    if (ids.length === 0) {
      return null;
    }

    const placements = PaperUtil.getPlacementsById(ids);
    const items: Paper.Item[] = placements.map(p => p.getPaperItem());

    if (items.length === 0) {
      return null;
    }

    let bbox = PaperUtil.createBoundingBox(items);
    const pt = bbox.topLeft;
    const viewPoint = Paper.view.projectToView(pt);

    const gap = 10;

    const style = {
      position: "fixed",

      top: viewPoint.y - gap,
      left: viewPoint.x,
    };

    let groupButton = null;
    if (placements.length > 1) {
      groupButton = ToolbarButtonFactory.create("group", placements);
    }

    let ungroupButton = null;
    if (placements.length === 1 && placements[0].type === "group") {
      ungroupButton = ToolbarButtonFactory.create(
        "ungroup",
        placements,
      );
    }

    const createSymbolButton = ToolbarButtonFactory.create(
      "createSymbol",
      placements,
    );

    return (
      <div className="html-canvas">
        <Toolbar className="" style={style}>
          <button
            onClick={() =>
              appEventDispatcher.dispatch("exportSvg", items)
            }>
            exp
          </button>
          <button
            onClick={() =>
              appEventDispatcher.dispatch("changeProperty", {
                placements,
                changes: [
                  { property: "fill", value: "orange" },
                  { property: "color", value: "red" },
                ],
              })
            }>
            col
          </button>
          {groupButton}
          {ungroupButton}
          {createSymbolButton}
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

export default connect(mapStateToProps)(SelectedPlacementToolbar);
