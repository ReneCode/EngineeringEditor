import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import * as actions from "../../../actions";

import PageList from "./PageList";
import PageModal from "./PageModal";
import Page from "../../../model/Page";

class PageNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewPageModal: false,
    };
  }

  async componentDidMount() {
    this.props.dispatch(actions.loadPages(this.props.projectId));
  }

  onClickCreatePage = () => {
    this.setState({
      showNewPageModal: true,
    });
  };

  onCloseModal = async name => {
    this.setState({
      showNewPageModal: false,
    });
    if (!name) {
      return;
    }
    const page = new Page(name);
    page.projectId = this.props.projectId;

    const newPage = await this.props.dispatch(
      actions.createPage(page),
    );
    console.log("newPage:", newPage);
    // if page is created then open it
    this.onClickPage(newPage);
  };

  onClickPage = page => {
    const url = `/p/${this.props.projectId}/s/${page.id}`;
    this.props.history.push(url);
  };

  render() {
    return (
      <div className="pagenavigator">
        <div className="button" onClick={this.onClickCreatePage}>
          Create Page
        </div>
        <PageList
          className="pagelist"
          pages={this.props.pages}
          activePageId={this.props.pageId}
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

PageNavigator.propTypes = {
  projectId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    projectId: state.project.projectId,
    pageId: state.project.pageId,
    pages: state.project.pages,
  };
};

export default connect(mapStateToProps)(withRouter(PageNavigator));
