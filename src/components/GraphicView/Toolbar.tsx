import React from "react";

export type ToolbarItemDef = {
  text: string;
  onClick: any;
};

interface IProps {
  direction?: "row" | "column";
  className: string;
  items: ToolbarItemDef[];
}

const Toolbar = (props: IProps) => {
  let className = `${props.className} toolbar`;
  const direction = props.direction || "row";
  className = `${className} flexdirection--${direction}`;
  return (
    <div className={className}>
      {props.items.map(item => {
        return <button onClick={item.onClick}>{item.text}</button>;
      })}
    </div>
  );
};

export default Toolbar;
