import GraphicSymbol from "./graphic/GraphicSymbol";
import Placement from "./Placement";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";

export const updatePlacementsSymbolRef = (
  placements: Placement[],
  symbols: GraphicSymbol[],
) => {
  placements.forEach(p => {
    if (p && p.type === "symbolref") {
      updateOneSymbolRef(<GraphicSymbolRef>p, symbols);
    }
  });
};

export const updateGraphicsSymbolRef = (
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
        updateGraphicsSymbolRef(symbol.items, symbols);
      }
    }
  });
};

export const updateOneSymbolRef = (
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
