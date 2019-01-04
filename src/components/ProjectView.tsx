import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../actions";

import Sidebar, { ISidebarButton } from "./Sidebar";
import Workspace from "./Workspace/Workspace";
import GraphicView from "./GraphicView/GraphicView";
import SelectSymbolModal from "./SelectSymbol/SelectSymbolModal";
import { RouteComponentProps } from "react-router";
import { IGlobalState } from "../reducers";
import { IdType } from "../model/types";
import setPageId from "../actions/setPageId";
import { setProjectId } from "../actions/projectActions";
import DetailView from "./DetailView/DetailView";

interface IProps extends RouteComponentProps<any> {
  showModalId: string;
  projectId: IdType;
  dispatch: Function;
}

class ProjectView extends Component<IProps> {
  private graphicViewRef: any;
  state = {
    activeWorkspaceId: "",
  };

  componentDidMount() {
    this.useRoutingParams();
  }

  componentDidUpdate() {
    this.useRoutingParams();
  }

  useRoutingParams = async () => {
    const { match } = this.props;
    const { projectId, pageId } = match.params;

    // set the projectId only it it changed
    // because e.g. symbol-loading is not needed
    if (this.props.projectId !== projectId) {
      this.props.dispatch(setProjectId(projectId));
    }
    await this.props.dispatch(setPageId(projectId, pageId));
  };

  clickSidebar = (sidebarButton: ISidebarButton) => {
    const id = sidebarButton.id;
    if (sidebarButton.workspace) {
      let workspaceId: string | null = id;

      if (id === this.state.activeWorkspaceId) {
        // click on active workspace will remove it
        workspaceId = null;
      }
      const resizeGraphicView =
        !workspaceId || !this.state.activeWorkspaceId;

      this.setState({ activeWorkspaceId: workspaceId }, () => {
        if (resizeGraphicView) {
          // https://itnext.io/advanced-react-redux-techniques-how-to-use-refs-on-connected-components-e27b55c06e34
          // graphicView is wrapped from redux connect()
          this.graphicViewRef.getWrappedInstance().onResize();
        }
      });
    }
  };

  render() {
    const sidebarButtons = [
      { id: "pages", text: "Pages", workspace: true },
      { id: "devices", text: "Devices", workspace: true },
      { id: "parts", text: "Parts", workspace: true },
      { id: "drawing", text: "Drawing", workspace: true },
      { id: "settings", text: "Settings" },
    ];

    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26871
    return (
      <React.Fragment>
        <Sidebar
          buttons={sidebarButtons}
          active={this.state.activeWorkspaceId}
          onClick={this.clickSidebar}
        />
        <Workspace workspace={this.state.activeWorkspaceId} />
        <GraphicView ref={ref => (this.graphicViewRef = ref)} />
        <DetailView />
        <SelectSymbolModal
          show={this.props.showModalId === "selectSymbol"}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    showModalId: state.project.showModalId,
    projectId: state.project.projectId,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectView));
