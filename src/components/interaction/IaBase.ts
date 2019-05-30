import { IGlobalState } from "../../store/reducers";
import Placement from "../../model/Placement";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";
import { DispatchFunction } from "../../model/types";

export enum IaEventType {
  none = 0,
  mouseDown,
  mouseUp,
  mouseMove,
  keyDown,
}

export type GetEventResult = Promise<{
  type: IaEventType;
  event: MouseEvent | KeyboardEvent;
  point: Point;
  pointWc: Point;
  transform: TransformCoordinate;
}>;

export interface IaContext {
  getEvent(types: IaEventType[] | IaEventType): GetEventResult;
  dispatch: DispatchFunction;
  getState: () => IGlobalState;
}

class IaBase {
  context: IaContext;

  constructor(context: IaContext) {
    this.context = context;
  }

  start(...args: any): any {
    throw new Error("can't start IaBase");
  }

  stop() {}

  isEscape = (result: any) => {
    return (
      !result ||
      (result.type === IaEventType.keyDown &&
        result.event.key === "Escape")
    );
  };

  isMouseEvent = (result: any) => {
    return (
      result &&
      (result.type === IaEventType.mouseDown ||
        result.type === IaEventType.mouseMove ||
        result.type === IaEventType.mouseUp)
    );
  };

  getEvent = async () => {
    const result = await this.context.getEvent([
      IaEventType.mouseUp,
      IaEventType.mouseMove,
      IaEventType.keyDown,
    ]);
    if (this.isEscape(result)) {
      return null;
    } else {
      return result;
    }
  };

  selectItems = () => {
    return this.context.getState().graphic.items;
  };

  getProjectId = () => {
    return this.context.getState().project.projectId;
  };
  getPageId = () => {
    return this.context.getState().project.pageId;
  };

  pickItems(pt: Point): Placement[] {
    const {
      canvas,
      viewport,
      items,
      cursor,
    } = this.context.getState().graphic;
    const transform = new TransformCoordinate(viewport, canvas);
    const pickRadius = transform.canvasLengthToWc(
      //      cursor.radiusScreen,
      10,
    );
    const pickedPlacements = items.filter(
      p => p.pickable() && p.nearPoint(pt, pickRadius),
    );
    return pickedPlacements;
  }
}

export default IaBase;
