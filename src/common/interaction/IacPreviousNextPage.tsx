import React from "react";
import { withRouter } from "react-router-dom";
import Paper from "paper";

import Page from "../../model/Page";
import appEventDispatcher from "../Event/AppEventDispatcher";
import { AppEventType } from "../Event/AppEventType";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import { RouteComponentProps } from "react-router";
import { IdType } from "../../model/types";

interface IProps extends RouteComponentProps {
  pages: Page[];
  pageId: IdType;
  projectId: IdType;
}

class IacPreviousNextPage extends React.Component<IProps> {
  private unsubscribeFn: Function[] = [];

  constructor(props: IProps) {
    super(props);

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("previousPage", this.previousPage),
    );
    this.unsubscribeFn.push(
      appEventDispatcher.subscribe("nextPage", this.nextPage),
    );
  }

  componentWillUnmount() {
    this.unsubscribeFn.forEach(fn => fn());
  }

  previousPage = (type: AppEventType) => {
    const currentIndex = this.props.pages.findIndex(
      page => page.id === this.props.pageId,
    );
    if (currentIndex > 0) {
      this.toPage(currentIndex - 1);
    }
  };

  nextPage = (type: AppEventType) => {
    const currentIndex = this.props.pages.findIndex(
      page => page.id === this.props.pageId,
    );
    if (currentIndex + 1 < this.props.pages.length) {
      this.toPage(currentIndex + 1);
    }
  };

  toPage(index: number) {
    const pageId = this.props.pages[index].id;
    const url = `/p/${this.props.projectId}/s/${pageId}`;
    this.props.history.push(url);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    pages: state.project.pages,
    pageId: state.project.pageId,
    projectId: state.project.projectId,
  };
};

export default withRouter(
  connect(mapStateToProps)(IacPreviousNextPage),
);
