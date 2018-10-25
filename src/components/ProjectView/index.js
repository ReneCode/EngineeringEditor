import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProjectView extends Component {
  state = {};

  render() {
    const { match } = this.props;
    const projectId = match.params.id;
    return <div>Project View: {projectId}</div>;
  }
}

export default withRouter(ProjectView);
