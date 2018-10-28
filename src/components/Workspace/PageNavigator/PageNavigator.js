import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../actions";

import PageList from "./PageList";
import PageModal from "./PageModal";

import getUrl from "../../../common/getUrl";

class PageNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewPageModal: false,
      pages: [],
    };
  }

  async componentDidMount() {
    try {
      const url = getUrl("pages");
      const res = await fetch(
        url + `?projectId=${this.props.projectId}`,
      );
      const json = await res.json();
      this.setState({
        pages: json,
      });
    } catch (ex) {}
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

    const newPage = await this.savePage(page);
    this.setState(state => ({
      pages: state.pages.concat(newPage),
    }));
  };

  async savePage(page) {
    const url = getUrl("pages");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(page),
      });
      const json = await res.json();
      return json;
    } catch (ex) {}
  }

  onClickPage = page => {
    this.props.dispatch(actions.setPage(page));
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
          pages={this.state.pages}
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
  };
};

export default connect(mapStateToProps)(PageNavigator);
