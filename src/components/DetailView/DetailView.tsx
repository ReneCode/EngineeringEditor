import React, { Component } from "react";
import { connect } from "react-redux";
import { IGlobalState } from "../../reducers";
import PageDetailView from "./PageDetailView";
import PlacementDetailView from "./PlacementDetailView";
import Placement from "../../model/Placement";
import { IdType } from "../../model/types";
import Page from "../../model/Page";
import updatePageAction from "../../actions/updatePage";
import deepClone from "../../common/deepClone";
import { updateElementAction } from "../../actions/changeElementActions";

interface IProps {
  pageId: IdType;
  pages: Page[];
  dispatch: Function;
}

class DetailView extends Component<IProps> {
  onPageChange = (page: Page, property: string, value: string) => {
    if (property !== "name") {
      throw new Error("bad property onPageChange");
    }
    const newPage = deepClone(page);
    newPage[property] = value;

    this.props.dispatch(updatePageAction(newPage));
  };

  onPlacementChange = (
    placement: Placement,
    property: string,
    value: string,
  ) => {
    const newPlacement = deepClone(placement);
    // todo validate property & value
    newPlacement[property] = value;

    this.props.dispatch(
      updateElementAction("placement", newPlacement),
    );
  };

  render() {
    let component = null;

    // if (this.props.selectedItems.length > 0) {
    //   const placement = this.props.selectedItems[0];
    //   component = (
    //     <PlacementDetailView
    //       key={placement.id}
    //       placement={placement}
    //       onChange={this.onPlacementChange}
    //     />
    //   );
    // } else if (this.props.pageId) {
    //   const page = this.props.pages.find(
    //     (p: Page) => p.id === this.props.pageId,
    //   );
    //   if (page) {
    //     component = (
    //       <PageDetailView page={page} onChange={this.onPageChange} />
    //     );
    //   } else {
    //     console.log(
    //       ": cant find page:",
    //       this.props.pageId,
    //       this.props.pages,
    //     );
    //   }
    // }
    return (
      <div className="ObjectView">
        <div className="scrolling">{component}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    pageId: state.project.pageId,
    pages: state.project.pages,
  };
};

export default connect(mapStateToProps)(DetailView);
