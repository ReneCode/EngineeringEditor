import React from "react";

import "./IconButton.scss";
import svgData from "./svg-data";

interface IProps {
  onClick: Function;
  icon: string;
  title?: string;
}

const IconButton = (props: IProps) => {
  const data = svgData[props.icon];
  if (!data) {
    console.log("icon not found", props.icon);
    return null;
  }
  return (
    <div
      className={`icon-btn icon-${props.icon}`}
      onClick={() => props.onClick()}
      title={props.title || props.icon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={data.viewBox || "0 0 40 40"}>
        {data.path.map((p: string, idx: number) => {
          return (
            <path
              key={idx}
              d={p}
              stroke={data.stroke || "#eee"}
              fill={data.fill || "#444"}
              strokeWidth={data.strokeWidth || "2"}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default IconButton;
