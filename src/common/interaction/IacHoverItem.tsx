import React from "react";

import Paper from "paper";
import { ItemName } from "../ItemName";
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
        if (this.hoverItem !== hitItem) {
          this.removeHover();

          this.hoverItem = hitItem;
          this.drawHover(hitItem);
        }
      }
    } else {
      this.removeHover();
      this.hoverItem = null;
    }
  };

  private removeHover() {
    if (this.hoverItem && this.hoverItem.name === ItemName.grip) {
      this.hoverItem.fillColor = configuration.gripFillColor;
    }
    if (this._tempItem) {
      this._tempItem.remove();
      this._tempItem = null;
    }
  }

  private drawHover(item: Paper.Item) {
    const id = item.data;
    if (this.props.selectedPlacementIds.includes(id)) {
      return;
    }

    switch (item.name) {
      case ItemName.grip:
        item.fillColor = configuration.gripHoverFillColor;
        break;

      case ItemName.itemSymbolRef:
        {
          const paperSymbolRef = item as Paper.PlacedSymbol;
          const bounds = paperSymbolRef.symbol.definition.bounds;
          const rect = new Paper.Path.Rectangle(bounds);
          rect.name = ItemName.temp;
          rect.position = paperSymbolRef.position;
          rect.strokeColor = configuration.itemHoverStrokeColor;
          rect.strokeWidth = configuration.hoverStrokeWidth;
          this._tempItem = rect;
        }
        break;
      default: {
        const rect = new Paper.Path.Rectangle(item.bounds);
        rect.name = ItemName.temp;
        rect.strokeColor = configuration.itemHoverStrokeColor;
        rect.strokeWidth = configuration.hoverStrokeWidth;
        this._tempItem = rect;
      }
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
