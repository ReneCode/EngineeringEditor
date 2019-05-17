import React from "react";

import Paper from "paper";
import { ItemName } from "../ItemMetaData";
import { updateElementAction } from "../../actions/changeElementActions";
import Placement from "../../model/Placement";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import ResizeBox from "./ResizeBox";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import GraphicArc from "../../model/graphic/GraphicArc";

interface IProps {
  dispatch: Function;
  selectedPaperItems: Paper.Item[];
  items: Placement[];
}

class IacMove extends React.Component<IProps> {
  unsubscribeFn: Function[] = [];
  resizeBox: ResizeBox = new ResizeBox();
  modus: null | "moving" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
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

  onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    if (this.modus === "resize") {
      placements = this.props.selectedPaperItems.map(item => {
        const placement = this.getPlacementById(item.data);
        if (!placement) {
          throw new Error("placement not found");
        }
        return placement.fitToRect(this.resizeBox.bounds());
      });
    }

    if (this.modus === "moving") {
      const moveDelta = event.point.subtract(this.firstPoint);
      placements = this.props.selectedPaperItems.map(item => {
        const placement = this.getPlacementById(item.data);
        if (!placement) {
          throw new Error("placement not found");
        }
        return placement.translate(moveDelta);
      });
    }

    this.modus = null;
    this.updatePlacements(placements);

    this.handleItem = null;
  };

  private async updatePlacements(placements: Placement[]) {
    if (placements.length > 0) {
      await this.props.dispatch(
        updateElementAction("placement", placements),
      );
    }
  }

  private getHitTestItem(
    result: any,
    itemName: string,
  ): Paper.Item | null {
    if (result && result.item) {
      if (ItemName.match(itemName, result.item.name)) {
        return result.item;
      }
    }
    return null;
  }

  showItemModifyGrips(item: Paper.Item) {
    const placement = this.getPlacementById(item.data) as GraphicArc;
    if (placement) {
      placement.showGrips();
    }
    console.log("drawGrips for: ", item.name);
  }

  private onMouseDragResize(event: Paper.MouseEvent) {
    // console.log("MouseDragResize");
    // that is the item for that handle
    if (!this.handleItem) {
      throw new Error("handleItem not set");
    }

    const sizeA = this.resizeBox.getStartBoundingBox();
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

  getPlacementById(id: string): Placement | undefined {
    return this.props.items.find(placement => placement.id === id);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedPaperItems: state.graphic.selectedPaperItems,
    items: state.graphic.items,
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
)(IacMove);

// { withRef: true }, // to get reference in GraphicView   this.ref = com.getWrappedInstance()
