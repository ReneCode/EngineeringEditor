import React from "react";
import PropTypes from "prop-types";

const PageListItem = props => {
  let className = "pagelist-item";
  if (props.active) {
    className += " active";
  }

  return (
    <div className={className} onClick={props.onClick}>
      {props.page.name}
    </div>
  );
};

PageListItem.propTypes = {
  active: PropTypes.bool,
  page: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PageListItem;
