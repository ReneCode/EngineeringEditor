import React from "react";

interface IProps {
  children: any;
  style?: object;
  direction?: "row" | "column";
  className: string;
}

const Toolbar = (props: IProps) => {
  let className = `${props.className} toolbar`;
  const direction = props.direction || "row";
  className = `${className} flexdirection--${direction}`;
  return (
    <div className={className} style={props.style}>
      {props.children}
    </div>
  );
};

export default Toolbar;
