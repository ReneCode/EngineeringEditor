import Paper from "paper";
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
      return new GraphicSymbol([], new Paper.Point(0, 0));
    }
    return symbol;
  };

  for (let placement of items) {
    if (placement instanceof GraphicSymbolRef) {
      let symbol = getSymbol(placement.name);
      placement.setSymbol(symbol);
    } else if (placement instanceof GraphicGroup) {
      const childItems = placement.children;
      updateSymbolRef(childItems, symbols);
    }
  }
};

export default updateSymbolRef;
