import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import { IGlobalState } from "../../store/reducers";
import Page from "../../model/Page";
import { loadPagesAction } from "../../actions/projectActions";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

interface IProps extends RouteComponentProps {
  dispatch: Function;
  projectId: string;
  pageId: string;
  pages: Page[];
}

class PageNavigation extends React.Component<IProps> {
  componentDidUpdate(prevProps: IProps) {
    if (this.props.projectId !== prevProps.projectId) {
      this.props.dispatch(loadPagesAction(this.props.projectId));
    }
  }

  render() {
    if (!this.props.pageId) {
      return null;
    }

    const page = this.props.pages.find(
      p => p.id === this.props.pageId,
    );
    let pageName = "";
    if (page) {
      pageName = page.name;
    }
    return (
      <div className="page-navigation">
        <div
          className="button"
          onClick={() => appEventDispatcher.dispatch("previousPage")}>
          prev
        </div>
        <div className="page-navigation__name">{pageName}</div>
        <div
          className="button"
          onClick={() => appEventDispatcher.dispatch("nextPage")}>
          next
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    projectId: state.project.projectId,
    pageId: state.project.pageId,
    pages: state.project.pages,
  };
};

export default withRouter(connect(mapStateToProps)(PageNavigation));
