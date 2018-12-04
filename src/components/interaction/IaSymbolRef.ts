import IaBase, { IaConfig } from "./IaBase";
import GraphicBase from "../../model/graphic/GraphicPolygon";
import { IaEventType } from "./Interaction";
import * as actions from "../../actions";
import GraphicSymbolRef from "../../model/graphic/GraphicSymbolRef";
import Point from "../../common/point";

class IaSymbolRef extends IaBase {
  constructor(config: IaConfig) {
    super(config);
  }

  start = async (args: any[]) => {
    try {
      const symbolName = args[0];
      if (!symbolName) {
        throw Error("symbol name missing");
      }

      const symbols = this.props.state.graphic.symbols;
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
        const result = await this.props.getPoint([
          IaEventType.mouseDown,
          IaEventType.mouseMove,
          IaEventType.keyDown,
        ]);
        if (
          !result ||
          (result.type === IaEventType.keyDown &&
            result.event.key === "Escape")
        ) {
          this.props.dispatch(actions.setTempItem());
          return;
        }

        symbolRef.pt = result.pointWc;
        this.props.dispatch(actions.setTempItem(symbolRef));
        switch (result.type) {
          case IaEventType.mouseDown:
            this.saveGraphic(symbolRef);
            run = false;
            break;
        }
      } // while (run)
      return true; // restart
    } catch (ex) {}
  };
}

export default IaSymbolRef;
