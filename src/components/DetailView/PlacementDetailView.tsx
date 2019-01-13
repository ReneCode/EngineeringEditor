import React from "react";
import Placement from "../../model/Placement";
import PropertyView from "./PropertyView";
import GraphicConnectionPoint from "../../model/graphic/GraphicConnectionPoint";

interface IProps {
  placement: Placement;
  onChange: Function;
}

const PageDetailView = (props: IProps) => {
  const placement = props.placement;
  let moreComponent = null;
  let title = "Placement";
  if (placement instanceof GraphicConnectionPoint) {
    title = "Connection Point";
    moreComponent = (
      <PropertyView
        item={placement}
        property={"index"}
        onChange={props.onChange}
      />
    );
  }
  return (
    <React.Fragment>
      <div>{title}</div>
      <PropertyView item={placement} property={"projectId"} />
      <PropertyView item={placement} property={"id"} />
      <PropertyView
        item={placement}
        property={"color"}
        onChange={props.onChange}
      />
      {moreComponent}
    </React.Fragment>
  );
};

export default PageDetailView;
