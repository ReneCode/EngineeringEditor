import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions/actions";

import DeviceRow from "./DeviceRow";
import WorkspaceItem from "../WorkspaceItem";

class Devices extends Component {
  selectDevice = device => {
    this.props.dispatch(actions.setSelectedDevice(device));
  };

  render() {
    return (
      <WorkspaceItem>
        {this.props.devices.map((device, index) => {
          const selected = device === this.props.selectedDevice;
          return (
            <DeviceRow
              key={index}
              selected={selected}
              onClick={this.selectDevice}
              device={device}
            />
          );
        })}
      </WorkspaceItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: state.project.devices,
    selectedDevice: state.project.selectedDevice
  };
};

export default connect(mapStateToProps)(Devices);
