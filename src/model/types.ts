import { IGlobalState } from "../reducers";

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
  | "rect";

export type ModalId = "" | "selectSymbol";

export type DispatchFunction = (action: any) => any;

export type LayerType = undefined | "autoconnect";

export type GetGlobalStateFunction = () => IGlobalState;
