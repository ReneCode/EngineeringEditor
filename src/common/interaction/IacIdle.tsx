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
import configuration from "../configuration";

interface IProps {
  dispatch: Function;
  items: Placement[];
}

class IacIdle extends React.Component<IProps> {
  // unsubscribeFn: Function[] = [];
  // resizeBox: ResizeBox = new ResizeBox();
  // modus: null | "resize" = null;
  // firstPoint: Paper.Point = new Paper.Point(0, 0);
  // handleItem: Paper.Item | null = null;
  // selectedPaperItemsOrginal: Paper.Item[] = [];

  // hitTestOptions: Paper.IHitTestOptions = {
  //   tolerance: 4,
  //   segments: true,
  //   stroke: true,
  //   fill: true,
  // };

  // componentDidMount() {
  //   this.unsubscribeFn.push(
  //     appEventDispatcher.subscribe("mouseDrag", this.onMouseDrag),
  //   );
  //   this.unsubscribeFn.push(
  //     appEventDispatcher.subscribe("mouseUp", this.onMouseUp),
  //   );
  //   this.unsubscribeFn.push(
  //     appEventDispatcher.subscribe("mouseDown", this.onMouseDown),
  //   );
  // }
  // componentWillUnmount() {
  //   this.unsubscribeFn.forEach(fn => fn());
  // }

  // componentWillUpdate(newProps: IProps) {
  //   if (
  //     newProps.selectedPaperItems !== this.props.selectedPaperItems
  //   ) {
  //     // this.resizeBox.create(newProps.selectedPaperItems);
  //   }
  // }

  // onMouseDown = (type: AppEventType, event: Paper.MouseEvent) => {
  //   const project = Paper.project;

  //   const result = project.hitTest(event.point, this.hitTestOptions);
  //   this.firstPoint = event.point;

  //   const handleItem = this.getHitTestItem(
  //     result,
  //     ItemName.resizeHandle,
  //   );
  //   if (handleItem) {
  //     this.modus = "resize";
  //     this.handleItem = handleItem;
  //     this.handleItem.fillColor = configuration.handleHoverColor;
  //     return;
  //   }
  // };

  // onMouseDrag = (type: AppEventType, event: Paper.MouseEvent) => {
  //   if (this.modus == "resize") {
  //     this.onMouseDragResize(event);
  //     return;
  //   }
  // };

  // onMouseUp = (type: AppEventType, event: Paper.MouseEvent) => {
  //   let placements: Placement[] = [];

  //   if (this.modus === "resize") {
  //     placements = this.props.selectedPaperItems.map(item => {
  //       const placement = this.getPlacementById(item.data);
  //       if (!placement) {
  //         throw new Error("placement not found");
  //       }
  //       return placement.fitToRect(this.resizeBox.bounds());
  //     });
  //   }

  //   this.modus = null;
  //   this.updatePlacements(placements);

  //   this.handleItem = null;
  // };

  // private async updatePlacements(placements: Placement[]) {
  //   if (placements.length > 0) {
  //     await this.props.dispatch(
  //       updateElementAction("placement", placements),
  //     );
  //   }
  // }

  // private getHitTestItem(
  //   result: any,
  //   itemName: string,
  // ): Paper.Item | null {
  //   if (result && result.item) {
  //     if (ItemName.match(itemName, result.item.name)) {
  //       return result.item;
  //     }
  //   }
  //   return null;
  // }

  // private onMouseDragResize(event: Paper.MouseEvent) {
  //   // console.log("MouseDragResize");
  //   // that is the item for that handle
  //   if (!this.handleItem) {
  //     throw new Error("handleItem not set");
  //   }

  //   const sizeA = this.resizeBox.getStartBoundingBox();
  //   const keepRatio: boolean = true; //event.modifiers.command;
  //   this.resizeBox.moveHandle(
  //     this.handleItem,
  //     event.point,
  //     keepRatio,
  //   );

  //   const rect = this.resizeBox.bounds();
  //   // console.log(rect);
  //   this.props.selectedPaperItems.forEach(i => {
  //     i.fitBounds(rect);
  //   });
  // }

  // getPlacementById(id: string): Placement | undefined {
  //   return this.props.items.find(placement => placement.id === id);
  // }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
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
)(IacIdle);
