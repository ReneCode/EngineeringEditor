import React from "react";

export type ToolbarItemDef = {
  text: string;
  onClick: any;
};

interface IProps {
  children?: any;
  style?: object;
  direction?: "row" | "column";
  className: string;
  items?: ToolbarItemDef[];
}

const Toolbar = (props: IProps) => {
  let className = `${props.className} toolbar`;
  const direction = props.direction || "row";
  className = `${className} flexdirection--${direction}`;
  if (!props.items) {
    return (
      <div className={className} style={props.style}>
        {props.children}
      </div>
    );
  } else {
    return (
      <div className={className} style={props.style}>
        {props.items.map((item, index) => {
          return (
            <button key={index} onClick={item.onClick}>
              {item.text}
            </button>
          );
        })}
      </div>
    );
  }
};

export default Toolbar;
