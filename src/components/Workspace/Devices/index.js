import React, { Component } from "react";
import { connect } from "react-redux";

import DeviceRow from "./DeviceRow";
import WorkspaceItem from "../WorkspaceItem";

class Devices extends Component {
  render() {
    return (
      <WorkspaceItem>
        {this.props.devices.map((device, index) => {
          return <DeviceRow key={index} device={device} />;
        })}
      </WorkspaceItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: state.project.devices
  };
};

export default connect(mapStateToProps)(Devices);
