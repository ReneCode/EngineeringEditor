import { IGlobalState } from "../../reducers";
import * as actions from "../../actions";
import GraphicBase from "../../model/graphic/GraphicBase";
import Placement from "../../model/Placement";
import { updateOneSymbolRef } from "../../sagas/updateSymbolRef";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import Point from "../../common/point";
import TransformCoordinate from "../../common/transformCoordinate";

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
  dispatch: Function;
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
      cursor.radiusScreen,
    );
    const pickedPlacements = items.filter(p =>
      p.nearPoint(pt, pickRadius),
    );
    return pickedPlacements;
  }

  saveGraphic = async (graphic: GraphicBase) => {
    try {
      const placement = await this.context.dispatch(
        actions.apiSaveGraphicItem(graphic),
      );
      this.updatePlacement(placement);

      this.context.dispatch(actions.setTempItem());
      this.context.dispatch(actions.addItem(placement));
      return placement;
    } catch (ex) {
      console.log("Exception on saveGraphic:", ex);
    }
  };

  updatePlacement(placement: Placement) {
    // const graphic = placement.graphic;
    // if (graphic) {
    //   if (graphic.type === "symbolref") {
    //     const symbolRef = graphic as GraphicSymbolRef;
    //     const symbols = this.context.getState().graphic.symbols;
    //     updateOneSymbolRef(symbolRef, symbols);
    //   }
    // }
  }
}

export default IaBase;
