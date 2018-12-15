import React from "react";

import "./ProjectCard.scss";
import IconButton from "../common/IconButton";

const ProjectCard = ({ active, onClick, onExport, project }) => {
  let className = "projectcard";
  if (active) {
    className += " selected-card";
  }
  return (
    <div className={className} onClick={() => onClick(project)}>
      <div className="text">
        <div className="name">{project.name}</div>
      </div>
      <div className="actions">
        {onExport && (
          <IconButton
            icon="export"
            onClick={() => onExport(project)}
            title="Export"
          />
        )}
        {/* <IconButton icon="dots" onClick={() => onMore(project)} /> */}
      </div>
    </div>
  );
};

export default ProjectCard;
