import React from "react";

import "./ProjectFileName.css";

const ProjectFileName = props => {
  return (
    <div className="projectfilename" onClick={props.onClick}>
      {props.filename}
    </div>
  );
};

export default ProjectFileName;
