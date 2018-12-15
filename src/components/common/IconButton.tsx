import React from "react";

import "./IconButton.css";
import SvgExport from "./SvgExport";
import SvgImport from "./SvgImport";
import SvgDots from "./SvgDots";

interface IProps {
  onClick: Function;
  icon: string;
}

const IconButton = (props: IProps) => {
  let svg;
  switch (props.icon) {
    case "export":
      svg = <SvgExport />;
      break;
    case "import":
      svg = <SvgImport />;
      break;
    case "dots":
      svg = <SvgDots />;
      break;
  }

  return (
    <div className="icon-btn" onClick={() => props.onClick()}>
      <svg className="svg-icon" viewBox="0 0 20 20">
        {svg}
      </svg>
    </div>
  );
};

export default IconButton;
