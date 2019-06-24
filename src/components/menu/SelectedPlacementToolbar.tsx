import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import PaperUtil from "../../utils/PaperUtil";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import ToolbarButtonFactory from "../menu/ToolbarButtonFactory";
import PlacementUtil from "../../utils/PlacementUtil";
import FloatingToolbar from "./FloatingToolbar";

interface IProps {
  selectedPlacementIds: string[];
  enablePlacementToolbar: boolean;
  canvasSize: Paper.Size;
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
      ToolbarButtonFactory.create(
        "createSymbolAndSymbolRef",
        placementIds,
      ),
    );
    buttons.push(ToolbarButtonFactory.create("delete", placementIds));
    return buttons;
  }

  render() {
    if (!this.props.enablePlacementToolbar) {
      return null;
    }
    const placementIds = this.props.selectedPlacementIds;
    if (placementIds.length === 0) {
      return null;
    }

    const placements = PaperUtil.getPlacementsById(placementIds);
    const items: Paper.Item[] = placements.map(p => p.getPaperItem());

    if (items.length === 0) {
      return null;
    }

    const contextButtons = this.getContextButtons(placements);

    return (
      <div className="html--canvas">
        {/* <Toolbar className="" style={style}> */}
        <FloatingToolbar
          items={items}
          canvasSize={this.props.canvasSize}>
          <button
            onClick={() =>
              appEventDispatcher.dispatch("exportSvg", placementIds)
            }>
            exp
          </button>
          <button
            onClick={() =>
              appEventDispatcher.dispatch(
                "changeProperty",
                placementIds,
                [
                  { property: "fill", value: "orange" },
                  { property: "color", value: "red" },
                ],
              )
            }>
            col
          </button>
          {contextButtons.map(b => {
            return b;
          })}
          {/* </Toolbar> */}
        </FloatingToolbar>
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
