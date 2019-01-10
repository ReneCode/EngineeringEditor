import React from "react";
import Placement from "../../model/Placement";
import PropertyView from "./PropertyView";

interface IProps {
  placement: Placement;
  onChange: Function;
}

const PageDetailView = (props: IProps) => {
  const placement = props.placement;
  return (
    <React.Fragment>
      <div>Placement</div>
      <PropertyView item={placement} property={"id"} />
      <PropertyView item={placement} property={"projectId"} />
      <PropertyView
        item={placement}
        property={"color"}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
};

export default PageDetailView;