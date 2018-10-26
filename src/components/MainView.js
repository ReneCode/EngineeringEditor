import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navigator from "./Navigator";
import GraphicView from "./GraphicView";

class MainView extends Component {
  state = {
    activeWorkspace: "",
  };

  clickSidebar = name => {
    this.setState({ activeWorkspace: name });
  };

  render() {
    const { match } = this.props;
    const projectId = match.params.id;

    const sidebarButtons = [
      { name: "pages", text: "Pages" },
      { name: "devices", text: "Devices" },
      { name: "parts", text: "Parts" },
    ];

    return (
      <React.Fragment>
        <Sidebar
          buttons={sidebarButtons}
          active={this.state.activeWorkspace}
          onClick={this.clickSidebar}
        />
        <Navigator />
        <GraphicView />
      </React.Fragment>
    );
  }
}

export default withRouter(MainView);
