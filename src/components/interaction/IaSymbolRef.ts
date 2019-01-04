import IaBase, { IaContext, IaEventType } from "./IaBase";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import Point from "../../common/point";
import { setTempItem } from "../../actions";
import { createPlacementAction } from "../../actions/placementActions";

class IaSymbolRef extends IaBase {
  constructor(config: IaContext) {
    super(config);
  }

  start = async (args: any[]) => {
    try {
      const symbolName = args[0];
      if (!symbolName) {
        throw Error("symbol name missing");
      }

      const symbols = this.context.getState().graphic.symbols;
      const symbol = symbols.find(s => s.name === symbolName);
      if (!symbol) {
        throw Error("symbol not found: " + symbolName);
      }

      let run = true;
      let symbolRef = new GraphicSymbolRef(
        symbolName,
        new Point(),
        symbol,
      );
      while (run) {
        const result = await this.context.getEvent([
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (this.isEscape(result)) {
          this.context.dispatch(setTempItem());
          return;
        }

        symbolRef.pt = result.pointWc;
        this.context.dispatch(setTempItem(symbolRef));
        switch (result.type) {
          case IaEventType.mouseDown:
            this.context.dispatch(createPlacementAction(symbolRef));
            run = false;
            break;
        }
      } // while (run)
      return { restart: true };
    } catch (ex) {}
  };
}

export default IaSymbolRef;
