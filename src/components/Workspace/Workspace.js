import React from "react";
import PropTypes from "prop-types";

import PageNavigator from "./PageNavigator/PageNavigator";

const Workspace = props => {
  let component = null;
  switch (props.workspace) {
    case "pages":
      component = (
        <PageNavigator {...props} click={props.clickPage} />
      );
      break;

    case null:
      component = null;
      break;

    default:
      component = <div>workspace missing: {props.workspace}</div>;
  }

  if (!component) {
    return null;
  }
  return (
    <div className="Workspace">
      <div className="scrolling">{component}</div>
    </div>
  );
};

Workspace.propTypes = {
  workspace: PropTypes.string,
};

export default Workspace;
