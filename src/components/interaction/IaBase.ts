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
  getState(): IGlobalState;
}

class IaBase {
  props: IaContext;

  constructor(props: IaContext) {
    this.props = props;
  }

  // start() {}
  // stop() {}

  isEscape = (result: any) => {
    return (
      !result ||
      (result.type === IaEventType.keyDown &&
        result.event.key === "Escape")
    );
  };

  selectItems = () => {
    return this.props.getState().graphic.items;
  };

  saveGraphic = async (graphic: GraphicBase) => {
    try {
      const placement = await this.props.dispatch(
        actions.saveGraphicItem(graphic),
      );
      this.updatePlacement(placement);

      this.props.dispatch(actions.setTempItem());
      this.props.dispatch(actions.addItem(placement));
      return placement;
    } catch (ex) {
      console.log("Exception on saveGraphic:", ex);
    }
  };

  updatePlacement(placement: Placement) {
    const graphic = placement.graphic;
    if (graphic) {
      if (graphic.type === "symbolref") {
        const symbolRef = graphic as GraphicSymbolRef;
        const symbols = this.props.getState().graphic.symbols;
        updateOneSymbolRef(symbolRef, symbols);
      }
    }
  }
}

export default IaBase;
