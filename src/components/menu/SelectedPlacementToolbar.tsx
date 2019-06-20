import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import PaperUtil from "../../utils/PaperUtil";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import ToolbarButtonFactory from "../menu/ToolbarButtonFactory";
import Toolbar from "../menu/Toolbar";
import PlacementUtil from "../../utils/PlacementUtil";

interface IProps {
  selectedPlacementIds: string[];
  enablePlacementToolbar: boolean;
}

class SelectedPlacementToolbar extends React.Component<IProps> {
  getContextButtons(placements: Placement[]) {
    // individual toolbar-button for each placement-type
    const type = PlacementUtil.getUniqueType(placements);
    const placementIds = placements.map(p => p.id);
    const buttons: JSX.Element[] = [];
    switch (type) {
      case "group":
        buttons.push(
          ToolbarButtonFactory.create("ungroup", placementIds),
        );
        break;

      case "connectionpoint":
        buttons.push(
          ToolbarButtonFactory.create("rotate", placementIds),
        );
        break;
    }

    if (placements.length > 1) {
      buttons.push(
        ToolbarButtonFactory.create("group", placementIds),
      );
    }
    buttons.push(
      ToolbarButtonFactory.create("createSymbol", placements),
    );
    buttons.push(ToolbarButtonFactory.create("delete", placementIds));
    return buttons;
  }

  render() {
    if (!this.props.enablePlacementToolbar) {
      return null;
    }
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

    const contextButtons = this.getContextButtons(placements);

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
          {contextButtons.map(b => {
            return b;
          })}
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
    enablePlacementToolbar: state.project.enablePlacementToolbar,
  };
};

export default connect(mapStateToProps)(SelectedPlacementToolbar);
