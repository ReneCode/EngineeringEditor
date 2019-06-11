import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { RouteComponentProps } from "react-router";
import { IGlobalState } from "../store/reducers";
import { IdType } from "../model/types";
import setPageId from "../actions/setPageId";
import { setProjectId } from "../actions/projectActions";
import GraphicFrame from "./GraphicView/GraphicFrame";
import KeyboardDispatcher from "./KeyboardDispatcher";
import ErrorBoundary from "./ErrorBoundary";

interface IProps extends RouteComponentProps<any> {
  // showModalId: string;
  projectId: IdType;
  dispatch: Function;
}

class ProjectView extends Component<IProps> {
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
      await this.props.dispatch(setProjectId(projectId));
    }
    // console.log("setPageId()");

    await this.props.dispatch(setPageId(projectId, pageId));
  };

  // clickSidebar = (sidebarButton: ISidebarButton) => {
  //   const id = sidebarButton.id;
  //   if (sidebarButton.workspace) {
  //     let workspaceId: string | null = id;

  //     if (id === this.state.activeWorkspaceId) {
  //       // click on active workspace will remove it
  //       workspaceId = null;
  //     }
  //     const resizeGraphicFrame =
  //       !workspaceId || !this.state.activeWorkspaceId;

  //     this.setState({ activeWorkspaceId: workspaceId }, () => {
  //       if (resizeGraphicFrame) {
  //         window.dispatchEvent(new Event("resize"));
  //       }
  //     });
  //   }
  // };

  render() {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26871
    return (
      <ErrorBoundary>
        {/* <Sidebar
          buttons={sidebarButtons}
          active={this.state.activeWorkspaceId}
          onClick={this.clickSidebar}
        />
        <Workspace workspace={this.state.activeWorkspaceId} /> */}
        <GraphicFrame />
        {/* <DetailView /> */}
        <KeyboardDispatcher />
        {/* <SelectSymbolModal
          show={this.props.showModalId === "selectSymbol"}
        /> */}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    // showModalId: state.project.currentModalId,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectView));
