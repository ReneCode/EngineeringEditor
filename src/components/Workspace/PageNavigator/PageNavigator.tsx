import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PageList from "./PageList";
import PageModal from "./PageModal";
import Page from "../../../model/Page";
import {
  loadPagesAction,
  createPageAction,
} from "../../../actions/projectActions";
import { IGlobalState } from "../../../store/reducers";
import { RouteComponentProps } from "react-router";
import toggleArrayItem from "../../../utils/toggleArrayItem";

interface IProps extends RouteComponentProps {
  dispatch: Function;
  projectId: string;
  pageId: string;
  pages: Page[];
}

class PageNavigator extends React.Component<IProps> {
  state: {
    checkedPageIds: string[];
    showNewPageModal: boolean;
  } = {
    checkedPageIds: [],
    showNewPageModal: false,
  };

  async componentDidMount() {
    this.props.dispatch(loadPagesAction(this.props.projectId));
  }

  onClickCreatePage = () => {
    this.setState({
      showNewPageModal: true,
    });
  };

  onCloseModal = async (name: string) => {
    this.setState({
      showNewPageModal: false,
    });
    if (!name) {
      return;
    }
    const page = new Page(name);
    page.projectId = this.props.projectId;

    const newPage = await this.props.dispatch(createPageAction(page));
    // if page is created then open it
    this.onClickPage(newPage);
  };

  onClickPage = (page: Page) => {
    const url = `/p/${this.props.projectId}/s/${page.id}`;
    this.props.history.push(url);
  };

  onCheckPage = (page: Page) => {
    const newIds = toggleArrayItem(
      this.state.checkedPageIds,
      page.id,
    );
    this.setState({
      checkedPageIds: newIds,
    });
  };

  render() {
    return (
      <div className="pagenavigator">
        <div className="button" onClick={this.onClickCreatePage}>
          Create Page
        </div>
        <PageList
          pages={this.props.pages}
          checkedIds={this.state.checkedPageIds}
          activePageId={this.props.pageId}
          onCheckPage={this.onCheckPage}
          onClickPage={this.onClickPage}
        />
        <PageModal
          show={this.state.showNewPageModal}
          onClose={this.onCloseModal}
        />
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

export default withRouter(connect(mapStateToProps)(PageNavigator));
