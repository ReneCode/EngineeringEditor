import React from "react";
import { IIacComponent } from "./IIacComponent";

import Paper, { IHitTestOptions } from "paper";
import {
  ItemName,
  itemUnselect,
  itemSelect,
  itemGetMetaData,
} from "../ItemMetaData";
import { setSelectedPaperItems } from "../../actions/graphicActions";
import { updateElementAction } from "../../actions/changeElementActions";
import Point from "../point";
import Placement from "../../model/Placement";
import configuration from "../configuration";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
}

class IacSelect extends React.Component<IProps>
  implements IIacComponent {
  hoverItem: Paper.Item | null = null;
  change: null | "moving" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  tempItem: Paper.Item = new Paper.Item();
  segments: Paper.Segment[] = [];
  hitTestOptions: IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
  };

  componentWillUnmount() {
    this.selectPaperItem(null);
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    const project = Paper.project;

    // reset style from current tempItem
    const metaData = itemGetMetaData(this.tempItem);
    if (metaData.placement) {
      metaData.placement.paperSetStyle(this.tempItem);
    }
    /*
    if (this.selectedItems.length > 0) {
      // check hit on resize-handle  (segments) ?
      let results: HitResult[] = [];
      // only check on the selected items
      this.selectedItems.forEach(item => {
        results = results.concat(
          item.hitTestAll(event.point, {
            segments: true,
            tolerance: this.hitTestOptions.tolerance,
          }),
        );
      });
      if (results.length > 0) {
        this.segments = results.map(r => r.segment);
        return;
      } else {
        this.segments = [];
      }
    }
*/

    // item select
    const result = project.hitTest(event.point, this.hitTestOptions);
    this.firstPoint = event.point;

    const handleItem = this.getHitHandleItem(result);
    if (handleItem) {
      this.change = "resize";
      this.tempItem = handleItem;
      return;
    }

    // add to selection
    if (result && result.item) {
      const append = event.modifiers.shift;
      const item = result.item;
      this.selectPaperItem(item, append);
    } else {
      this.selectPaperItem(null);
    }
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    const result = Paper.project.hitTest(
      event.point,
      this.hitTestOptions,
    );
    // reset style from current tempItem
    const metaData = itemGetMetaData(this.tempItem);
    if (metaData.placement) {
      metaData.placement.paperSetStyle(this.tempItem);
    }

    const hitItem = this.getHitItem(result);
    if (hitItem) {
      this.tempItem = hitItem;
      this.tempItem.strokeColor = configuration.itemHoverColor;
      this.tempItem.strokeWidth = 2;
    }

    // reset hoverItem
    if (this.hoverItem) {
      switch (this.hoverItem.name) {
        case ItemName.resizeHandle:
          this.hoverItem.fillColor = "white";
          break;
      }
    }
    // paint hoverItem
    const hitHandle = this.getHitHandleItem(result);
    if (hitHandle) {
      this.hoverItem = hitHandle;
      hitHandle.fillColor = configuration.itemHoverColor;
    }
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    if (this.change == "resize") {
      this.tempItem.position = this.tempItem.position.add(
        event.delta,
      );
      return;
    }
    // if (this.segments.length > 0) {
    //   // resize
    //   this.segments.forEach(s => {
    //     s.point.x = s.point.x + event.delta.x;
    //     s.point.y = s.point.y + event.delta.y;
    //   });
    //   this.change = "resize";
    //   return;
    // }

    // move all items
    this.props.selectedPaperItems.forEach(item => {
      item.position = item.position.add(event.delta);

      // move also the resizeBox if there is any
      const metaData = itemGetMetaData(item);
      if (metaData.resizeBox) {
        metaData.resizeBox.position = metaData.resizeBox.position.add(
          event.delta,
        );
      }
    });
    this.change = "moving";
  };

  onMouseUp = async (event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    if (this.change === "resize") {
      placements = this.segments.map(segment => {
        const path = segment.path;
        const points = path.segments.map(s => {
          return new Point(s.point.x, s.point.y);
        });
        const metaData = itemGetMetaData(path);
        return metaData.placement.changeAfterResize(points);
      });
      return;
    }

    if (this.change === "moving") {
      const paperDelta = event.point.subtract(this.firstPoint);
      const completeDelta = new Point(paperDelta.x, paperDelta.y);
      placements = this.props.selectedPaperItems.map(item => {
        const metaData = itemGetMetaData(item);
        return metaData.placement.translate(completeDelta);
      });
    }

    this.change = null;
    if (placements.length > 0) {
      await this.props.dispatch(
        updateElementAction("placement", placements),
      );
    }
  };

  changeSelectedPaperItems(
    items: Paper.Item[],
    prevItems: Paper.Item[],
  ) {
    prevItems.forEach(item => {
      itemUnselect(item);
    });
    items.forEach(item => {
      itemSelect(item);
    });
  }

  selectPaperItem(item: Paper.Item | null, append: boolean = false) {
    if (!item) {
      this.props.dispatch(setSelectedPaperItems([]));
      return;
    }
    if (this.props.selectedPaperItems.includes(item)) {
      return;
    }
    if (append) {
      const payload = [...this.props.selectedPaperItems, item];
      this.props.dispatch(setSelectedPaperItems(payload));
    } else {
      this.props.dispatch(setSelectedPaperItems(item));
    }
  }

  private getHitItem(result: any): Paper.Item | null {
    // do not mark a selected item
    let canSelect = false;
    if (
      result &&
      result.item &&
      result.item.name != ItemName.resizeBox &&
      result.item.name != ItemName.resizeHandle
    ) {
      canSelect = true;
      if (
        this.props.selectedPaperItems.find(i => i === result.item)
      ) {
        canSelect = false;
      }
    }
    if (canSelect) {
      return result.item;
    }
    return null;
  }

  private getHitHandleItem(result: any): Paper.Item | null {
    let foundHandle = undefined;
    if (result && result.item) {
      if (result.item.name == ItemName.resizeHandle) {
        return result.item;
      }
    }
    return null;
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPaperItems: state.graphic.selectedPaperItems,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    dispatch: (e: any) => dispatch(e),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }, // to get reference in GraphicView   this.ref = com.getWrappedInstance()
)(IacSelect);
