import React from "react";

import Paper from "paper";
import {
  ItemName,
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
import ResizeBox from "./ResizeBox";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import PaperPlacement from "../../model/graphic/PaperPlacement";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
}

class IacSelect extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  resizeBox: ResizeBox = new ResizeBox();
  modus: null | "moving" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  hoverItem: Paper.Item = new Paper.Item();
  handleItem: Paper.Item | null = null;
  selectedPaperItemsOrginal: Paper.Item[] = [];

  hitTestOptions: Paper.IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
  };

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseMove", this.onMouseMove),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
    );
  }
  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
    this.selectPaperItem(null);
  }

  componentWillUpdate(newProps: IProps) {
    if (
      newProps.selectedPaperItems !== this.props.selectedPaperItems
    ) {
      this.resizeBox.create(newProps.selectedPaperItems);
    }
  }

  onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
    const project = Paper.project;

    this.hoverItem.remove();

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

  onMouseMove = (type: AppEventType, event: Paper.MouseEvent) => {
    this.hoverItem.remove();

    const result = Paper.project.hitTest(
      event.point,
      this.hitTestOptions,
    );

    const hitItem = this.getHitItem(result);
    if (hitItem) {
      this.hoverItem = hitItem.clone();
      this.hoverItem.strokeColor = configuration.itemHoverColor;
      this.hoverItem.strokeWidth = 2;
      this.hoverItem.fillColor = null;
    }

    // paint hoverItem
    const hitHandle = this.getHitHandleItem(result);
    if (hitHandle) {
      this.hoverItem = hitHandle.clone();
      this.hoverItem.fillColor = configuration.itemHoverColor;
    }
    this.hoverItem.bringToFront();
  };

  onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
    if (this.modus == "resize") {
      this.onMouseDragResize(event);
      return;
    }

    // move all items
    this.props.selectedPaperItems.forEach(item => {
      item.position = item.position.add(event.delta);
    });
    this.resizeBox.move(event.delta);
    this.modus = "moving";
  };

  onMouseUp = async (type: AppEventType, event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    if (this.modus === "resize") {
      this.selectedPaperItemsOrginal.forEach(i => i.remove());
      this.selectedPaperItemsOrginal = [];
      // TODO
      // that is the item for that handle
      // if (!this.handleItem) {
      //   throw new Error("handleItem not set");
      // }
      // const newPlacement = metaData.placement.updateFromHandles(
      //   resizeBox.getHandles(),
      // );
      // await this.props.dispatch(
      //   updateElementAction("placement", newPlacement),
      // );
    }

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

    if (this.modus === "resize") {
      placements = this.props.selectedPaperItems.map(item => {
        const metaData = itemGetMetaData(item);
        if (!metaData || !metaData.placement) {
          throw new Error("metaData or placement not set");
        }
        // const placement = metaData.placement;
        // if (placement instanceof PaperPlacement) {
        //   // placement.setPaperItem(item);
        // } else {
        //   // old
        return metaData.placement.fitToRect(this.resizeBox.bounds());
      });
    }

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

    this.handleItem = null;
  };

  // changeSelectedPaperItems(
  //   items: Paper.Item[],
  //   prevItems: Paper.Item[],
  // ) {
  //   prevItems.forEach(item => {
  //     itemUnselect(item);
  //   });
  //   items.forEach(item => {
  //     itemSelect(item);
  //   });
  // }

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
      // if (
      //   this.props.selectedPaperItems.find(i => i === result.item)
      // ) {
      //   canSelect = false;
      // }
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
    if (result && result.item) {
      if (result.item.name == ItemName.resizeHandle) {
        return result.item;
      }
    }
    return null;
  }

  private onMouseDragResize(event: Paper.MouseEvent) {
    // console.log("MouseDragResize");
    // that is the item for that handle
    if (!this.handleItem) {
      throw new Error("handleItem not set");
    }

    /*
    if (this.selectedPaperItemsOrginal.length === 0) {
      console.log("clone");
      this.selectedPaperItemsOrginal = this.props.selectedPaperItems.map(
        i => i.clone({ insert: false }),
      );
    }
*/
    const sizeA = this.resizeBox.getStartBoundingBox();
    const centerA = sizeA.center;
    const keepRatio: boolean = true; //event.modifiers.command;
    this.resizeBox.moveHandle(
      this.handleItem,
      event.point,
      keepRatio,
    );

    const rect = this.resizeBox.bounds();
    // console.log(rect);
    this.props.selectedPaperItems.forEach(i => {
      i.fitBounds(rect);
    });

    /*
    const centerB = this.resizeBox.getCenter();
    console.log(centerA, centerB);
    const translate = centerB.subtract(centerA);

    const scale = new Paper.Point(
      1,
      1,
      // sizeB.x / sizeA.x,
      // sizeB.y / sizeA.y,
    );

    this.props.selectedPaperItems.forEach(
      (i: Paper.Item, index: number) => {
        i.replaceWith(this.selectedPaperItemsOrginal[index]);
        let matrix = new Paper.Matrix(1, 0, 0, 1, 0, 0);
        matrix = matrix.scale(scale.x, scale.y, i.position);
        matrix = matrix.translate(translate);
        i.matrix = matrix;
      },
    );

*/

    // const translate = this.resizeBox.getTranslation();

    // const newItem = (metaData.placement as GraphicCircle).paperDrawFromResizeBox(
    //   resizeBox,
    // );
    // newItem.data = resizeItem.data;
    // resizeBox.replaceItemWith(newItem);
    // resizeItem.replaceWith(newItem);
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
)(IacSelect);

// { withRef: true }, // to get reference in GraphicView   this.ref = com.getWrappedInstance()
