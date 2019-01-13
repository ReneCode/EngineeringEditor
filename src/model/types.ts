import { IGlobalState } from "../reducers";
import { IaEventType } from "../components/interaction/IaBase";
import { SyntheticEvent } from "react";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";

export type IdType = string | undefined;

export type GraphicType =
  | ""
  | "symbolref"
  | "symbol"
  | "group"
  | "line"
  | "polygon"
  | "circle"
  | "connectionpoint"
  | "rect"
  | "text";

export type ModalId = "" | "selectSymbol";

export type DispatchFunction = (action: any) => any;

export type LayerType = undefined | "autoconnect";

export type GetGlobalStateFunction = () => IGlobalState;

export interface IIaEvent {
  type: IaEventType;
  event: SyntheticEvent;
  pointWc?: Point;
  pointCanvas?: Point;
  transform?: TransformCoordinate;
}
