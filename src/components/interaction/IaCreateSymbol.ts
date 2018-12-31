import IaBase, { IaContext, IaEventType } from "./IaBase";
import * as actions from "../../actions";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";

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

        const newSymbol = await this.context.dispatch(
          actions.createSymbol(symbol),
        );

        // replace the old selected items with a symbolRef to that new symbol
        const symbolRef = new GraphicSymbolRef(
          newSymbol.name,
          symbol.insertPt,
          symbol,
        );
        await this.context.dispatch(
          actions.createPlacement(symbolRef),
        );

        // delete old items
        await this.context.dispatch(
          actions.deletePlacementAction(selectedItems),
        );
      }
    } catch (ex) {
      console.log("Exception:", ex);
    }
  };
}

export default IaCreateSymbol;
