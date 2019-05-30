import { IGlobalState } from "../store/reducers";
import { IaEventType } from "../components/interaction/IaBase";
import { SyntheticEvent } from "react";
import Point from "../common/point";
import TransformCoordinate from "../common/transformCoordinate";
import Placement from "./Placement";

export type IdType = string | undefined;

export type GraphicType =
  | ""
  | "arc"
  | "#paper"
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

export type LayerType = undefined | "autoconnect" | "grip";

export type GetGlobalStateFunction = () => IGlobalState;

export interface IIaEvent {
  type: IaEventType;
  event: SyntheticEvent;
  pointWc?: Point;
  pointCanvas?: Point;
  transform?: TransformCoordinate;
}

export type IIaEventHandler = (ev: IIaEvent) => {};

///
interface Element {
  ref: string;
  data: any;
}

export type RefType = "placement";
export type ElementType = Placement | Placement[];
