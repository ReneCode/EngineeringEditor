import React, { Component } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import PageDetailView from "./PageDetailView";
import PlacementDetailView from "./PlacementDetailView";
import Placement from "../../model/Placement";
import { IdType } from "../../model/types";
import Page from "../../model/Page";

interface IProps {
  selectedItems: Placement[];
  pageId: IdType;
  pages: Page[];
}

class DetailView extends Component<IProps> {
  render() {
    let component = null;

    if (this.props.selectedItems.length > 0) {
      const placement = this.props.selectedItems[0];
      component = <PlacementDetailView placement={placement} />;
    } else if (this.props.pageId) {
      const page = this.props.pages.find(
        (p: Page) => p.id === this.props.pageId,
      );
      if (page) {
        component = <PageDetailView page={page} />;
      } else {
        console.log(
          ": cant find page:",
          this.props.pageId,
          this.props.pages,
        );
      }
    }
    return (
      <div className="ObjectView">
        <div className="scrolling">{component}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    selectedItems: state.graphic.selectedItems,
    pageId: state.project.pageId,
    pages: state.project.pages,
  };
};

export default connect(mapStateToProps)(DetailView);
