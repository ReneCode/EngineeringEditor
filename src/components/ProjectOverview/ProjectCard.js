import React from "react";

import "./ProjectCard.scss";
import IconButton from "../common/IconButton";
import SvgIcon from "../common/SvgIcon";

const ProjectCard = ({
  active,
  onClick,
  onImport,
  onExport,
  onDelete,
  project,
}) => {
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
        {onDelete && (
          <IconButton
            icon="trash"
            onClick={() => onDelete(project)}
            title="Delete"
          />
        )}

        {onExport && (
          <IconButton
            icon="export"
            onClick={() => onExport(project)}
            title="Export"
          />
        )}
        {onImport && (
          <IconButton
            icon="import"
            onClick={() => onImport(project)}
            title="Import"
          />
        )}
        {/* <IconButton icon="dots" onClick={() => onMore(project)} /> */}
      </div>
    </div>
  );
};

export default ProjectCard;
