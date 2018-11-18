import React from "react";
import SymbolListItem from "./SymbolListItem";

const SymbolList = props => {
  return (
    <div className="symbolList">
      {props.symbols.map(s => (
        <SymbolListItem
          key={s.id}
          onClick={() => props.onClickSymbol(s)}
          symbol={s}
          active={props.activeSymbolId === s.id}
        />
      ))}
    </div>
  );
};

export default SymbolList;
