import IaBase, { IaContext, IaEventType } from "./IaBase";
import * as actions from "../../actions";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { updateGraphicsSymbolRef } from "../../sagas/updateSymbolRef";
import apiSaveSymbol from "../../common/api/apiSaveSymbol";

class IaCreateSymbol extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async () => {
    try {
      const selectedItems = this.context.getState().graphic
        .selectedItems;
      if (selectedItems.length === 0) {
        console.log("please select items for the symbol");
        return;
      }
      console.log(
        "set a point for the insert point of the new symbol",
      );
      const result = await this.context.getEvent([
        IaEventType.mouseDown,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        return;
      }
      if (this.isMouseEvent(result)) {
        const { projectId } = this.context.getState().project;
        const symbolName =
          "symbol-" + Math.floor(1000 * Math.random());
        const symbol = new GraphicSymbol(projectId, symbolName);
        symbol.items = selectedItems as any;
        symbol.insertPt = result.pointWc;
        console.log(":", symbol);
        const newSymbol = await apiSaveSymbol(symbol);
        console.log("::", newSymbol);

        // if there are symbolRef in ths new symbol
        // the GraphicSymbol .symbol property is no more set
        // we have to update it
        const symbols = this.context.getState().graphic.symbols;
        updateGraphicsSymbolRef(newSymbol.items, symbols);

        this.context.dispatch(actions.addSymbol(newSymbol));

        // const placement = new Placement(projectId, pageId, symbolRef);
        // const newPlacement = await apiSavePlacement(placement);
        // if (newPlacement) {
        //   const newSymbolRef = placement.graphic as GraphicSymbolRef;
        //   newSymbolRef.symbol = newSymbol;
        //   this.context.dispatch(actions.addItem(placement));
        //   await apiDeletePlacements(selectedItems);

        //   this.context.dispatch(actions.removeItem(selectedItems));
        //   this.context.dispatch(
        //     actions.removeSelectedItem(selectedItems),
        //   );
        // }
      }
    } catch (ex) {
      console.log("Exception:", ex);
    }
  };
}

export default IaCreateSymbol;
