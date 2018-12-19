import React from "react";
import PropTypes from "prop-types";

import PageNavigator from "./PageNavigator/PageNavigator";
import DrawingWorkspace from "./DrawingWorkspace";

const Workspace = props => {
  let component = null;
  switch (props.workspace) {
    case "pages":
      component = <PageNavigator {...props} />;
      break;

    case "drawing":
      component = <DrawingWorkspace {...props} />;
      break;

    case "":
      component = null;
      break;

    default:
    // component = <div>workspace missing: {props.workspace}</div>;
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
