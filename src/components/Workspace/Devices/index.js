import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions/actions";

import { Container, RowContainer } from "./elements";
import DeviceRow from "./DeviceRow";
import Filter from "./Filter";
import AddTextRow from "./AddTextRow";
import WorkspaceItem from "../WorkspaceItem";

class Devices extends Component {
  state = {
    filter: ""
  };

  selectDevice = device => {
    this.props.dispatch(actions.setSelectedDevice(device));
  };

  handleFilterSubmit = filter => {
    this.setState({
      filter
    });
  };

  handleAddDevice = text => {
    console.log("add:", text);
    this.props.dispatch(actions.addDevice(text));
    return true;
  };

  render() {
    return (
      <WorkspaceItem>
        <Container>
          {/* <Filter onSubmit={this.handleFilterSubmit} /> */}
          <AddTextRow onAdd={this.handleAddDevice} />
          {this.props.devices
            .filter(device => device.name.match(this.state.filter))
            .map((device, index) => {
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
        </Container>
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
