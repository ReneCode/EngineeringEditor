import React from "react";

import Paper from "paper";
import { ItemName } from "../ItemMetaData";
import configuration from "../configuration";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperUtil from "../../utils/PaperUtil";
import { connect } from "react-redux";
import { IGlobalState } from "../../store/reducers";

interface IProps {
  selectedPlacementIds: string[];
}

class IacHoverItem extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  hoverItem: Paper.Item | null = null;
  oldStrokeColor: string | Paper.Color | null = null;
  oldStrokeWidth: number = 0;
  oldFillColor: string | Paper.Color | null = null;

  _tempItem: Paper.Item | null = null;

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.selectedPlacementIds !==
      this.props.selectedPlacementIds
    ) {
      this.removeHover();
    }
  }

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {
    const result = PaperUtil.hitTest(event.point);

    if (result) {
      let hitItem = PaperUtil.getHitTestItem(result, [
        ItemName.itemAny,
        ItemName.grip,
      ]);

      if (hitItem) {
        // if (
        //   hitItem.parent &&
        //   hitItem.parent.name === ItemName.itemGroup
        // ) {
        //   hitItem = hitItem.parent;
        // }

        if (this.hoverItem !== hitItem) {
          this.removeHover();

          if (this.drawHover(hitItem)) {
            this.hoverItem = hitItem;

            return;
          }

          let newStrokeColor = configuration.itemHoverStrokeColor;
          let newFillColor = hitItem.fillColor;
          if (hitItem.name === ItemName.grip) {
            newStrokeColor = configuration.gripHoverStrokeColor;
            newFillColor = configuration.gripHoverFillColor;
          }

          this.redrawOldHoverItem();
          this.oldFillColor = hitItem.fillColor;
          this.oldStrokeColor = hitItem.strokeColor;
          this.oldStrokeWidth = hitItem.strokeWidth;

          this.hoverItem = hitItem;
          this.hoverItem.strokeColor = newStrokeColor;
          if (newFillColor) {
            this.hoverItem.fillColor = newFillColor;
          }
          this.hoverItem.strokeWidth = 2;
        }
      }
    } else {
      if (this.removeHover()) {
        return;
      }

      this.redrawOldHoverItem();
      this.hoverItem = null;
    }
  };

  private removeHover() {
    if (this._tempItem) {
      this._tempItem.remove();
      this._tempItem = null;
      return true;
    }
    return false;
  }

  private drawHover(item: Paper.Item): boolean {
    const id = item.data;
    if (this.props.selectedPlacementIds.includes(id)) {
      return true;
    }

    switch (item.name) {
      case ItemName.itemSymbolRef: {
        const paperSymbolRef = item as Paper.PlacedSymbol;
        const bounds = paperSymbolRef.symbol.definition.bounds;
        const rect = new Paper.Path.Rectangle(bounds);
        rect.position = paperSymbolRef.position;

        rect.strokeColor = configuration.itemHoverStrokeColor;
        rect.strokeWidth = configuration.hoverStrokeWidth;

        this._tempItem = rect;
        return true;
      }
      case ItemName.itemText: {
        // const rect = new Paper.Path.Rectangle(item.bounds);
        // rect.strokeColor = configuration.itemHoverStrokeColor;
        // rect.strokeWidth = configuration.hoverStrokeWidth;
        // this._tempItem = rect;
        return true;
      }

      default: {
        return false;
      }
    }
  }

  redrawOldHoverItem() {
    if (this.hoverItem) {
      if (this.oldStrokeColor) {
        this.hoverItem.strokeColor = this.oldStrokeColor;
      } else {
        delete this.hoverItem.strokeColor;
      }
      if (this.oldFillColor) {
        this.hoverItem.fillColor = this.oldFillColor;
      } else {
        delete this.hoverItem.strokeColor;
      }

      this.hoverItem.strokeWidth = this.oldStrokeWidth;
    }
  }

  render() {
    return null;
  }
}
const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPlacementIds: state.graphic.selectedPlacementIds,
  };
};

export default connect(mapStateToProps)(IacHoverItem);
