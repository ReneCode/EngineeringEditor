import React, { Component } from "react";
import {
  withRouter,
  Redirect,
  RouteComponentProps,
} from "react-router";
import graphql from "../common/api/graphql";

class FirstPageRedirect extends Component<RouteComponentProps<any>> {
  state = {
    redirect: "",
  };

  async componentDidMount() {
    const { projectId } = this.props.match.params;

    if (projectId) {
      const query: string = `query q($projectId:ID!, $pageId:ID!) {
        project(id:$projectId) {
          id
          page(id:$pageId) {
            id name
          }
        }
      }`;
      const variables = {
        projectId,
        pageId: "first",
      };
      const result = await graphql(query, variables);
      if (result && result.project && result.project.page) {
        const pageId = result.project.page.id;
        const url = `/p/${projectId}/s/${pageId}`;
        this.setState({ redirect: url });
      } else {
        // no first page
        const url = `/p/${projectId}/nopage`;
        this.setState({ redirect: url });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return null;
  }
}

export default withRouter(FirstPageRedirect);
