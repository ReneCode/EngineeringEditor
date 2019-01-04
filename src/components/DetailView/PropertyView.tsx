import React from "react";

interface IProps {
  item: any;
  property: string;
}
const PropertyView = (props: IProps) => {
  const value = props.item[props.property];
  return (
    <div className="PropertyView">
      <div className="prop-name">{props.property}</div>
      <div className="prop-value">{value}</div>
    </div>
  );
};

export default PropertyView;
