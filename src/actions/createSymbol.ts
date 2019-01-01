import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { IGlobalState } from "../reducers";
import { updateAllSymbolRef } from "../model/updateSymbolRef";
import apiCreateSymbolAction from "./apiCreateSymbol";

export const createSymbolAction = (symbol: GraphicSymbol): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<GraphicSymbol> => {
    try {
      const newSymbol = await apiCreateSymbolAction(symbol);
      // if there are symbolRef in ths new symbol
      // the GraphicSymbol .symbol property is no more set
      // we have to update it
      const symbols = getState().graphic.symbols;
      updateAllSymbolRef(newSymbol.items, symbols);

      const action = {
        type: actionTypes.ADD_SYMBOL,
        payload: newSymbol,
      };
      await dispatch(action);

      return newSymbol;
    } catch (ex) {
      throw new Error("Exception:" + ex);
    }
  };
};
