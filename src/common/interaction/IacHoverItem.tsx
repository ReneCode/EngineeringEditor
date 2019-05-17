import React from "react";

import Paper from "paper";
import { ItemName } from "../ItemMetaData";
import configuration from "../configuration";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import Placement from "../../model/Placement";

interface IProps {
  items: Placement[];
}

class IacHoverItem extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  hoverItem: Paper.Item | null = null;
  oldStrokeColor: string | Paper.Color | null = null;
  oldStrokeWidth: number = 0;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {
    const hitItem = PaperUtil.hitTestItem(event.point, [
      ItemName.itemAny,
      ItemName.grip,
    ]);

    if (hitItem) {
      if (this.hoverItem !== hitItem) {
        this.redrawOldHoverItem();
        this.oldStrokeColor = hitItem.strokeColor;
        this.oldStrokeWidth = hitItem.strokeWidth;
        this.hoverItem = hitItem;
        this.hoverItem.strokeColor = configuration.itemHoverColor;
        this.hoverItem.strokeWidth = 2;
      }
    } else {
      this.redrawOldHoverItem();
      this.hoverItem = null;
    }
  };

  redrawOldHoverItem() {
    if (this.hoverItem) {
      this.hoverItem.strokeColor = this.oldStrokeColor;
      this.hoverItem.strokeWidth = this.oldStrokeWidth;
    }
  }

  private getPlacementById(id: string): Placement | undefined {
    return this.props.items.find(placement => placement.id === id);
  }

  render() {
    return null;
  }
}
const mapStateToProps = (state: IGlobalState) => {
  return {
    items: state.graphic.items,
  };
};

export default connect(mapStateToProps)(IacHoverItem);
