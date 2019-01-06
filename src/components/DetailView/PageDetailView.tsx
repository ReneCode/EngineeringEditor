import React from "react";
import PropertyView from "./PropertyView";
import Page from "../../model/Page";

interface IProps {
  page: Page;
  onChange: Function;
}

const PageDetailView = (props: IProps) => {
  const page = props.page;

  return (
    <React.Fragment key={page.id}>
      <div>Page</div>
      <PropertyView item={page} property={"id"} />
      <PropertyView item={page} property={"projectId"} />
      <PropertyView
        item={page}
        property={"name"}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
};
export default PageDetailView;
