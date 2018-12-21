import IaBase, { IaContext, IaEventType } from "./IaBase";
import * as actions from "../../actions";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import Point from "../../common/point";
import GraphicSymbol from "../../model/graphic/GraphicSymbol";
import { updateGraphicsSymbolRef } from "../../sagas/updateSymbolRef";

class IaCreateSymbol extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async (args: any[]) => {
    try {
      const selectedItems = this.context.getState().graphic
        .selectedItems;
      if (selectedItems.length === 0) {
        return;
      }
      console.log(
        "set a point for the insert point of the new symbol",
      );
      const result = await this.context.getEvent([
        IaEventType.mouseDown,
        IaEventType.mouseMove,
        IaEventType.keyDown,
      ]);
      if (this.isEscape(result)) {
        return;
      }
      const projectId = this.context.getState().project.projectId;
      const symbolName = "symbol-" + Math.floor(1000 * Math.random());
      const newSymbol = new GraphicSymbol(projectId, symbolName);
      // if there are symbolRef in ths new symbol
      // the GraphicSymbol .symbol property is no more set
      // we have to update it
      const symbols = this.context.getState().graphic.symbols;
      updateGraphicsSymbolRef(newSymbol.items, symbols);

      this.context.dispatch(actions.addSymbol(newSymbol));
    } catch (ex) {}
  };
}

export default IaCreateSymbol;
