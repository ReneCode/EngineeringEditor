import React from "react";
import { IIacComponent } from "./IIacComponent";

import Paper, { IHitTestOptions } from "paper";
import {
  ItemName,
  itemUnselect,
  itemSelect,
  itemGetMetaData,
  ItemMetaData,
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
  modus: null | "moving" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  hoverItem: Paper.Item = new Paper.Item();
  handleItem: Paper.Item = new Paper.Item();
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

    this.resetHover();

    // item select
    const result = project.hitTest(event.point, this.hitTestOptions);
    this.firstPoint = event.point;

    const handleItem = this.getHitTestItem(
      result,
      ItemName.resizeHandle,
    );
    if (handleItem) {
      this.modus = "resize";
      this.handleItem = handleItem;
      return;
    }

    const item = this.getHitTestItem(result, null);
    // add to selection
    if (item) {
      const append = event.modifiers.shift;
      this.selectPaperItem(item, append);
    } else {
      this.selectPaperItem(null);
    }
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    this.resetHover();

    const result = Paper.project.hitTest(
      event.point,
      this.hitTestOptions,
    );

    const hitItem = this.getHitItem(result);
    if (hitItem) {
      this.hoverItem = hitItem;
      this.hoverItem.strokeColor = configuration.itemHoverColor;
      this.hoverItem.strokeWidth = 2;
    }

    // paint hoverItem
    const hitHandle = this.getHitHandleItem(result);
    if (hitHandle) {
      this.hoverItem = hitHandle;
      hitHandle.fillColor = configuration.itemHoverColor;
    }
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    if (this.modus == "resize") {
      this.onMouseDragResize(event);
      return;
    }

    // move all items
    this.props.selectedPaperItems.forEach(item => {
      item.position = item.position.add(event.delta);

      // move also the resizeBox if there is any
      const metaData = itemGetMetaData(item);
      if (metaData && metaData.resizeBox) {
        metaData.resizeBox.position = metaData.resizeBox.position.add(
          event.delta,
        );
      }
    });
    this.modus = "moving";
  };

  onMouseUp = async (event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    // if (this.change === "resize") {
    //   placements = this.segments.map(segment => {
    //     const path = segment.path;
    //     const points = path.segments.map(s => {
    //       return new Point(s.point.x, s.point.y);
    //     });
    //     const metaData = itemGetMetaData(path);
    //     return metaData.placement.changeAfterResize(points);
    //   });
    //   return;
    // }

    if (this.modus === "moving") {
      const paperDelta = event.point.subtract(this.firstPoint);
      const completeDelta = new Point(paperDelta.x, paperDelta.y);
      placements = this.props.selectedPaperItems.map(item => {
        const metaData = itemGetMetaData(item) as ItemMetaData;
        return metaData.placement.translate(completeDelta);
      });
    }

    this.modus = null;
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

  /**
   * @summary returns the hit item, if it is not resizeBox or resizeHandle
   * @param result
   */
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

  private getHitTestItem(
    result: any,
    itemName: string | null,
  ): Paper.Item | null {
    if (result && result.item) {
      if (itemName) {
        if (result.item.name == itemName) {
          return result.item;
        }
      } else {
        console.log(":", result.item.name);
        if (!result.item.name) {
          return result.item;
        }
      }
    }
    return null;
  }

  /**
   *
   * @param result result of Paper.project.hitTest
   * @returns handle (Paper.Item) if some handle was hit, otherwise null
   */
  private getHitHandleItem(result: any): Paper.Item | null {
    let foundHandle = undefined;
    if (result && result.item) {
      if (result.item.name == ItemName.resizeHandle) {
        return result.item;
      }
    }
    return null;
  }

  private resetHover() {
    // reset style from current hoverItem
    const metaData = itemGetMetaData(this.hoverItem);
    if (metaData && metaData.placement) {
      metaData.placement.paperSetStyle(this.hoverItem);
    }

    // reset hoverItem
    if (this.hoverItem) {
      switch (this.hoverItem.name) {
        case ItemName.resizeHandle:
          this.hoverItem.fillColor = "white";
          break;
      }
    }
  }

  private onMouseDragResize(event: Paper.MouseEvent) {
    this.hoverItem.position = this.hoverItem.position.add(
      event.delta,
    );
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
