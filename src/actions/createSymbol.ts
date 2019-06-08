import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { updateAllSymbolRef } from "../model/updateSymbolRef";
import apiCreateSymbol from "../common/api/apiCreateSymbol";
import { GetGlobalStateFunction } from "../model/types";

export const createSymbolAction = (symbol: GraphicSymbol): any => {
  return async (
    dispatch: any,
    getState: GetGlobalStateFunction,
  ): Promise<GraphicSymbol> => {
    try {
      const newSymbol = await apiCreateSymbol(symbol);
      // if there are symbolRef in ths new symbol
      // the GraphicSymbol .symbol property is no more set
      // we have to update it
      // const symbols = getState().graphic.symbols;
      // updateAllSymbolRef(newSymbol.placements, symbols);

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
