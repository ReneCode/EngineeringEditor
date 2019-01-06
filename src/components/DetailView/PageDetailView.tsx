import React, { Component } from "react";
import PropertyView from "./PropertyView";
import Page from "../../model/Page";
import { connect } from "react-redux";
import updatePageAction from "../../actions/updatePage";

interface IProps {
  page: Page;
  dispatch: Function;
}

class PageDetailView extends Component<IProps> {
  onChange = (page: Page, property: string, value: string) => {
    this.props.dispatch(updatePageAction(page, property, value));
  };

  render() {
    const page = this.props.page;

    return (
      <React.Fragment key={page.id}>
        <div>Page</div>
        <PropertyView item={page} property={"id"} />
        <PropertyView item={page} property={"projectId"} />
        <PropertyView
          item={page}
          property={"name"}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}
export default connect()(PageDetailView);
