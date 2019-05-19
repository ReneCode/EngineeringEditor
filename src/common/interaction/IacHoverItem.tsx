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
  oldFillColor: string | Paper.Color | null = null;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {
    const result = PaperUtil.hitTest(event.point);

    if (result) {
      const hitItem = PaperUtil.getHitTestItem(result, [
        ItemName.itemAny,
        ItemName.grip,
      ]);

      if (hitItem) {
        if (this.hoverItem !== hitItem) {
          let newStrokeColor = configuration.itemHoverColor;
          let newFillColor = hitItem.fillColor;
          if (hitItem.name == ItemName.grip) {
            newStrokeColor = configuration.gripHoverStrokeColor;
            newFillColor = configuration.gripHoverFillColor;
          }

          this.redrawOldHoverItem();
          this.oldFillColor = hitItem.fillColor;
          this.oldStrokeColor = hitItem.strokeColor;
          this.oldStrokeWidth = hitItem.strokeWidth;
          this.hoverItem = hitItem;
          this.hoverItem.strokeColor = newStrokeColor;
          this.hoverItem.fillColor = newFillColor;
          this.hoverItem.strokeWidth = 2;
        }
      }
    } else {
      this.redrawOldHoverItem();
      this.hoverItem = null;
    }
  };

  redrawOldHoverItem() {
    if (this.hoverItem) {
      this.hoverItem.fillColor = this.oldFillColor;
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
