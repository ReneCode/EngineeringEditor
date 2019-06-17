import { IGlobalState } from "../store/reducers";
import Placement from "./Placement";

export type IdType = string | undefined;

export type PlacementType =
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

export type ModalIdType = "" | "selectSymbol";

export type LayerType = undefined | "autoconnect" | "grip";

export type GetGlobalStateFunction = () => IGlobalState;

///
// interface Element {
//   ref: string;
//   data: any;
// }

export type RefType = "placement";
export type ElementType = Placement | Placement[];
