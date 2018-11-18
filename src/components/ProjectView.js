import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../actions";

import Sidebar from "./Sidebar";
import Workspace from "./Workspace/Workspace";
import GraphicView from "./GraphicView";
import SelectSymbolModal from "./SelectSymbol/SelectSymbolModal";

class ProjectView extends Component {
  state = {
    activeWorkspace: "drawing",
  };

  componentDidMount() {
    this.useRoutingParams();
  }

  componentDidUpdate() {
    this.useRoutingParams();
  }

  useRoutingParams = () => {
    const { match } = this.props;
    const { projectId, pageId } = match.params;

    this.props.dispatch(actions.setProjectId(projectId));
    this.props.dispatch(actions.setPageId(pageId));
  };

  clickSidebar = sidebarButton => {
    if (sidebarButton.workspace) {
      this.switchWorkspace(sidebarButton.name);
    }
  };

  switchWorkspace = name => {
    let workspace = name;
    if (name === this.state.activeWorkspace) {
      workspace = null;
    }
    const resizeGraphicView =
      !workspace || !this.state.activeWorkspace;

    this.setState({ activeWorkspace: workspace }, () => {
      if (resizeGraphicView) {
        // https://itnext.io/advanced-react-redux-techniques-how-to-use-refs-on-connected-components-e27b55c06e34
        // graphicView is wrapped from redux connect()
        this.graphicView.getWrappedInstance().onResize();
      }
    });
  };

  render() {
    const sidebarButtons = [
      { name: "pages", text: "Pages", workspace: true },
      { name: "devices", text: "Devices", workspace: true },
      { name: "parts", text: "Parts", workspace: true },
      { name: "drawing", text: "Drawing", workspace: true },
      { name: "settings", text: "Settings" },
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
        <SelectSymbolModal
          show={this.props.showModalId === "selectSymbol"}
          onClose={this.onCloseModal}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModalId: state.project.showModalId,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectView));
