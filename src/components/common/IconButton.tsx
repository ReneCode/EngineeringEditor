import React from "react";

import "./IconButton.scss";
import SvgExport from "./SvgExport";
import SvgImport from "./SvgImport";
import SvgDots from "./SvgDots";

import { ReactComponent as Upload } from "./svg/icon-upload.svg";
import { ReactComponent as Download } from "./svg/icon-download.svg";
import { ReactComponent as Trash } from "./svg/trash.svg";
import { ReactComponent as Close } from "./svg/close.svg";

interface IProps {
  onClick: Function;
  icon: string;
  title: string;
}

const IconButton = (props: IProps) => {
  let svg;
  switch (props.icon.toLowerCase()) {
    case "export":
      svg = <Upload />;
      break;
    case "import":
      svg = <Download />;
      break;

    case "trash":
      svg = <Trash />;
      break;
    case "close":
      svg = <Close />;
      break;
    case "dots":
      svg = <SvgDots />;
      break;
    default:
      return null;
  }

  return (
    <div
      className="icon-btn"
      onClick={() => props.onClick()}
      title={props.title}>
      <div className="svg-icon">{svg}</div>
    </div>
  );
};

export default IconButton;
