import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../actions";

import PageList from "./PageList";
import PageModal from "./PageModal";

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

    const page = {
      projectId: this.props.projectId,
      name,
    };

    this.props.dispatch(
      actions.createPage(this.props.projectId, page),
    );
  };

  onClickPage = page => {
    this.props.dispatch(actions.setPageId(page.id));
    this.props.dispatch(actions.loadGraphic(page.id));
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
    pages: state.project.pages,
  };
};

export default connect(mapStateToProps)(PageNavigator);
