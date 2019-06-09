import GraphicSymbol from "./graphic/GraphicSymbol";
import Placement from "./Placement";
import GraphicSymbolRef from "./graphic/GraphicSymbolRef";
import GraphicGroup from "./graphic/GraphicGroup";

const updateSymbolRef = (
  items: Placement[],
  symbols: GraphicSymbol[],
) => {
  const getSymbol = (name: string): GraphicSymbol => {
    const symbol = symbols.find(s => s.name === name);

    if (!symbol) {
      console.warn(`Symbol: ${name} not found`);
      return new GraphicSymbol([]);
    }
    return symbol;
  };

  for (let placement of items) {
    if (placement instanceof GraphicSymbolRef) {
      const symbolName = placement.getName();
      let symbol = getSymbol(symbolName);
      placement.setSymbol(symbol);
    } else if (placement instanceof GraphicGroup) {
      const childItems = placement.children;
      updateSymbolRef(childItems, symbols);
    }
  }
};

export default updateSymbolRef;
