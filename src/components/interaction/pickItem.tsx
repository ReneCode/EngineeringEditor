import { Component } from "react";
import { IaEventType } from "./Interaction";
import { IGlobalState } from "../../reducers";
import GraphicLine from "../../model/graphic/GraphicLine";
import * as actions from "../../actions";
import IaBase, { IaConfig } from "./IaBase";
import Point from "../../common/point";
import Placement from "../../model/Placement";
import TransformCoordinate from "../../common/transformCoordinate";

interface IPickItemResult {
  point: Point;
  items: Placement[];
}
class pickItem extends IaBase {
  start = async (args: string[]): Promise<IPickItemResult | null> => {
    try {
      const result = await this.props.getPoint([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (
        !result ||
        (result.type === IaEventType.keyDown &&
          result.event.key === "Escape")
      ) {
        return null;
      }
      switch (result.type) {
        case IaEventType.mouseDown:
          const point = result.pointWc;
          const items = this.getItems(point);
          return {
            point,
            items,
          };
      }
    } finally {
      return null;
    }
  };

  getItems = (point: Point): Placement[] => {
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

    return items.filter(item => {
      item.nearPoint(point, pickRadius);
    });
  };
}

export default pickItem;
