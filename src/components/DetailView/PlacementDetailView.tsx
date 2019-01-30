import React from "react";
import Placement from "../../model/Placement";
import PropertyView from "./PropertyView";
import GraphicConnectionPoint from "../../model/graphic/GraphicConnectionPoint";
import GraphicText from "../../model/graphic/GraphicText";

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
  } else if (placement instanceof GraphicText) {
    title = "Text";
    moreComponent = (
      <React.Fragment>
        <PropertyView
          item={placement}
          property={"text"}
          onChange={props.onChange}
        />
        <PropertyView
          item={placement}
          property={"fontSize"}
          onChange={props.onChange}
        />
        <PropertyView
          item={placement}
          property={"font"}
          onChange={props.onChange}
        />
        <PropertyView
          item={placement}
          property={"ref"}
          onChange={props.onChange}
        />
      </React.Fragment>
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
