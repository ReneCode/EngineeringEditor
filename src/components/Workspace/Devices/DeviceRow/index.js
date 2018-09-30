import React from "react";
import "./DeviceRow.css";

const DeviceRow = props => {
  const device = props.device;
  if (!device) {
    return null;
  }

  return <div className="device-row">{device.name}</div>;
};

export default DeviceRow;
