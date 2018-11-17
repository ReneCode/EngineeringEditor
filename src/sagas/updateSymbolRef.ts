import GraphicSymbol from "../model/graphic/GraphicSymbol";
import Placement from "../model/Placement";
import GraphicBase from "../model/graphic/GraphicBase";
import GraphicSymbolRef from "../model/graphic/GraphicSymbolRef";

export const updatePlacementsSymbolRef = (
  placements: Placement[],
  symbols: GraphicSymbol[],
) => {
  placements.forEach(p => {
    if (p.graphic && p.graphic.type === "symbolref") {
      updateOneSymbolRef(<GraphicSymbolRef>p.graphic, symbols);
    }
  });
};

export const updateGraphicsSymbolRef = (
  graphics: GraphicBase[],
  symbols: GraphicSymbol[],
  recursive: boolean = false,
) => {
  graphics.forEach((graphic: GraphicBase) => {
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
