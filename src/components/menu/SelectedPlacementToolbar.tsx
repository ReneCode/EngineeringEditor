import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import { ItemName } from "../../common/ItemMetaData";
import PaperUtil from "../../utils/PaperUtil";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar from "./Toolbar";
import ToolbarButtonFactory from "./ToolbarButtonFactory";

interface IProps {
  selectedPlacementIds: string[];
  items: Placement[];
}

class SelectedPlacementMenu extends React.Component<IProps> {
  render() {
    const ids = this.props.selectedPlacementIds;
    if (ids.length === 0) {
      return null;
    }

    const placements = PaperUtil.getPlacementsById(ids);
    const items: Paper.Item[] = placements
      .map(p => p.getPaperItem())
      .filter(i => !!i) as Paper.Item[];

    if (items.length === 0) {
      return null;
    }

    let bbox = items[0].bounds;
    for (let item of items) {
      bbox = bbox.unite(item.bounds);
    }
    const pt = bbox.topLeft;
    const viewPoint = Paper.view.projectToView(pt);

    const popMenuHeight = 46;
    const gap = 0;

    const style = {
      position: "absolute",

      top: viewPoint.y - popMenuHeight - gap,
      left: viewPoint.x,
    };

    let groupButton = null;
    if (placements.length > 1) {
      groupButton = ToolbarButtonFactory.create("group", {
        placements,
      });
    }

    let ungroupButton = null;
    if (placements.length === 1 && placements[0].type === "group") {
      ungroupButton = ToolbarButtonFactory.create("ungroup", {
        placements,
      });
    }

    const createSymbolButton = ToolbarButtonFactory.create(
      "createSymbol",
      { placements },
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

export default connect(mapStateToProps)(SelectedPlacementMenu);
