import React from "react";
import Placement from "../../model/Placement";
import PropertyView from "./PropertyView";

interface IProps {
  items: Placement[];
}

const PlacementView = (props: IProps) => {
  if (props.items.length === 0) {
    return null;
  }

  const item = props.items[0];
  return (
    <React.Fragment>
      <PropertyView item={item} property={"id"} />
      <PropertyView item={item} property={"color"} />
    </React.Fragment>
  );
};

export default PlacementView;
