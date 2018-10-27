import React from "react";
import "./DeviceRow.css";

import classNames from "classnames";

const DeviceRow = props => {
  const device = props.device;
  if (!device) {
    return null;
  }

  const selectedClass = props.selected ? "selected" : "";
  return (
    <div
      className={classNames(["device-row", selectedClass])}
      onClick={() => props.onClick(device)}
    >
      {device.name}
    </div>
  );
};

export default DeviceRow;
