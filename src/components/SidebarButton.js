import React from "react";
import PropTypes from "prop-types";

const SidebarButton = props => {
  let className = "SidebarButton";
  if (props.active) {
    className += " active";
  }
  return (
    <div className={className} onClick={props.onClick}>
      {props.text}
    </div>
  );
};

SidebarButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SidebarButton;
