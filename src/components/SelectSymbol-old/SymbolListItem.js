import React from "react";

const SymbolListItem = props => {
  let className = "list-item";
  if (props.active) {
    className += " active";
  }
  return (
    <div className={className} onClick={props.onClick}>
      {props.symbol.name}
    </div>
  );
};

export default SymbolListItem;
