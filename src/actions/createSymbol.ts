import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { GetGlobalStateFunction } from "../model/types";
import apiCreateSymbol from "../common/api/apiCreateSymbol";

export const createSymbolAction = (symbol: GraphicSymbol): any => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<GraphicSymbol> => {
    try {
      await apiCreateSymbol(symbol);

      const action = {
        type: actionTypes.ADD_SYMBOL,
        payload: symbol,
      };
      await dispatch(action);

      return symbol;
    } catch (ex) {
      throw new Error("Exception:" + ex);
    }
  };
};
