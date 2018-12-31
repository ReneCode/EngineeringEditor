import * as actionTypes from "./actionTypes";
import GraphicSymbol from "../model/graphic/GraphicSymbol";
import { IGlobalState } from "../reducers";
import apiCreateSymbol from "./apiSaveSymbol";
import { updateGraphicsSymbolRef } from "../model/updateSymbolRef";

export const createSymbol = (symbol: GraphicSymbol): any => {
  return async (
    dispatch: any,
    getState: () => IGlobalState,
  ): Promise<GraphicSymbol> => {
    try {
      const newSymbol = await apiCreateSymbol(symbol);
      // if there are symbolRef in ths new symbol
      // the GraphicSymbol .symbol property is no more set
      // we have to update it
      const symbols = getState().graphic.symbols;
      updateGraphicsSymbolRef(newSymbol.items, symbols);

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
