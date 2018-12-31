import GraphicSymbol from "./graphic/GraphicSymbol";
import Placement from "./Placement";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";

export const updateAllSymbolRef = (
  graphics: Placement[],
  symbols: GraphicSymbol[],
  recursive: boolean = false,
) => {
  graphics.forEach((graphic: Placement) => {
    if (graphic.type === "symbolref") {
      const symbol = updateOneSymbolRef(
        <GraphicSymbolRef>graphic,
        symbols,
      );
      if (recursive && symbol) {
        updateAllSymbolRef(symbol.items, symbols);
      }
    }
  });
};

const updateOneSymbolRef = (
  symbolRef: GraphicSymbolRef,
  symbols: GraphicSymbol[],
): GraphicSymbol | null => {
  const symbol = symbols.find(s => s.name === symbolRef.name);
  if (symbol) {
    symbolRef.symbol = symbol;
    return symbol;
  }
  console.log("Symbol missing:", symbolRef.name);
  return null;
};
