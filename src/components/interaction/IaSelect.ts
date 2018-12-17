import { Component } from "react";
import { IaEventType } from "./Interaction";
import { IGlobalState } from "../../reducers";
import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";
import IaBase, { IaConfig } from "./IaBase";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import Placement from "../../model/Placement";
import GraphicRect from "../../model/graphic/GraphicRect";
import { IA_MOVE } from "../../actions/interactionTypes";

class IaSelect extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  pickItems(pt: Point): Placement[] {
    const {
      canvas,
      viewport,
      items,
      cursor,
    } = this.props.getState().graphic;
    const transform = new TransformCoordinate(viewport, canvas);
    const pickRadius = transform.canvasLengthToWc(
      cursor.radiusScreen,
    );
    const pickedPlacements = items.filter(p =>
      p.nearPoint(pt, pickRadius),
    );
    return pickedPlacements;
  }

  start = async () => {
    try {
      let run = true;
      this.props.dispatch(actions.setCursorMode("select"));
      let nPoint = 0;
      let rect = new GraphicRect(new Point(), new Point());
      let firstPoint = new Point();
      let itemSelected = false;
      while (run) {
        const result = await this.props.getPoint([
          IaEventType.mouseUp,
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.props.dispatch(actions.setCursorMode());
          this.props.dispatch(actions.setTempItem());

          return;
        }
        if (nPoint === 0) {
          switch (result.type) {
            case IaEventType.mouseDown:
              nPoint++;
              firstPoint = result.pointWc;
              const items = this.pickItems(firstPoint);
              itemSelected = items.length > 0;
              if (!itemSelected) {
                this.props.dispatch(actions.clearSelectedItem());
              } else {
                this.props.dispatch(actions.addSelectedItem(items));
              }
              break;
          }
        } else {
          console.log(this.props.getState().graphic.selectedItems);
          const secondPoint = result.pointWc;
          switch (result.type) {
            case IaEventType.mouseUp:
            case IaEventType.mouseDown:
              if (secondPoint.equal(firstPoint)) {
                run = false;
              }
              break;

            case IaEventType.mouseMove:
              if (!itemSelected) {
                rect = new GraphicRect(firstPoint, secondPoint);
                this.props.dispatch(actions.setTempItem(rect));
              } else {
                run = false;
                this.props.dispatch(
                  actions.startInteraction(IA_MOVE, firstPoint),
                );
              }
              break;
          }
        }
      }
      this.props.dispatch(actions.setCursorMode());

      return true; // restart
    } finally {
    }
  };
}

export default IaSelect;
