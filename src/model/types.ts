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
