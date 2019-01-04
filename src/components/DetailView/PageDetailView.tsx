import React from "react";
import Placement from "../../model/Placement";
import PropertyView from "./PropertyView";
import Page from "../../model/Page";

interface IProps {
  page: Page;
}

const PageDetailView = (props: IProps) => {
  const page = props.page;
  return (
    <React.Fragment>
      <div>Page</div>
      <PropertyView item={page} property={"id"} />
      <PropertyView item={page} property={"projectId"} />
      <PropertyView item={page} property={"name"} />
    </React.Fragment>
  );
};

export default PageDetailView;
