import { Component } from "react";
import { IaEventType } from "./Interaction";
import { IGlobalState } from "../../reducers";
import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";
import IaBase, { IaConfig } from "./IaBase";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import Placement from "../../model/Placement";

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
    } = this.props.state.graphic;
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
      while (run) {
        const result = await this.props.getPoint([
          IaEventType.mouseUp,
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.props.dispatch(actions.setCursorMode());

          return;
        }
        switch (result.type) {
          case IaEventType.mouseDown:
            const pt = result.pointWc;
            const items = this.pickItems(pt);
            if (items.length === 0) {
              this.props.dispatch(actions.clearSelectedItem());
            } else {
              this.props.dispatch(actions.addSelectedItem(items));
            }
            break;
        }
      }
      this.props.dispatch(actions.setCursorMode());

      return true; // restart
    } finally {
    }
  };
}

export default IaSelect;
