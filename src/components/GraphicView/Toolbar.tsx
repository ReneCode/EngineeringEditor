import React from "react";

export type ToolbarItemDef = {
  text: string;
  onClick: any;
};

interface IProps {
  className: string;
  items: ToolbarItemDef[];
}

const Toolbar = (props: IProps) => {
  return (
    <div className={`${props.className} toolbar`}>
      {props.items.map(item => {
        return <button onClick={item.onClick}>{item.text}</button>;
      })}
    </div>
  );
};

export default Toolbar;
