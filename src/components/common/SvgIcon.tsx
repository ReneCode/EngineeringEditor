import React from "react";

import { ReactComponent as Trash } from "./svg/trash.svg";
import { ReactComponent as Close } from "./svg/close.svg";
import { ReactComponent as Upload } from "./svg/icon-upload.svg";
import { ReactComponent as Download } from "./svg/icon-download.svg";

interface IProps {
  name: string;
}

const SvgIcon = (props: IProps) => {
  switch (props.name.toLowerCase()) {
    case "trash":
      return <Trash />;
    case "close":
      return <Close />;
    case "upload":
      return <Upload />;
    case "download":
      return <Download />;
    default:
      return null;
  }
};

export default SvgIcon;
