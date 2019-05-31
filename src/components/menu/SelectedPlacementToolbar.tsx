import Paper from "paper";
import React from "react";
import { IGlobalState } from "../../store/reducers";
import { connect } from "react-redux";
import Placement from "../../model/Placement";
import { ItemName } from "../../common/ItemMetaData";
import PaperUtil from "../../utils/PaperUtil";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar from "./Toolbar";

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

    return (
      <div className="html-canvas">
        <Toolbar className="" style={style}>
          <button
            onClick={() =>
              appEventDispatcher.dispatch("exportSvg", items)
            }>
            ex
          </button>
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

export default connect(mapStateToProps)(SelectedPlacementMenu);
