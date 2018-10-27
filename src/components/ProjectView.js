import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Sidebar from "./Sidebar";
import Workspace from "./Workspace/Workspace";
import GraphicView from "./GraphicView";

class ProjectView extends Component {
  state = {
    activeWorkspace: "pages",
  };

  clickSidebar = name => {
    let workspace = name;
    if (name === this.state.activeWorkspace) {
      workspace = null;
    }
    const resizeGraphicView =
      !workspace || !this.state.activeWorkspace;

    this.setState({ activeWorkspace: workspace }, () => {
      if (resizeGraphicView) {
        this.graphicView.onResize();
      }
    });
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
        <Workspace workspace={this.state.activeWorkspace} />
        <GraphicView ref={ref => (this.graphicView = ref)} />
      </React.Fragment>
    );
  }
}

export default withRouter(ProjectView);
