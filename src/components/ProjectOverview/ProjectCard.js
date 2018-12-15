import React from "react";
import { Link } from "react-router-dom";

import "./ProjectCard.scss";
import IconButton from "../common/IconButton";

const ProjectCard = ({ project }) => {
  return (
    <div className="projectcard">
      <div className="text">
        <Link to={`p/${project.id}`}>{project.name}</Link>
        <div className="name">{project.name}</div>
        <div>{project.description}</div>
      </div>
      <div className="actions">
        <IconButton icon="export" />
        <IconButton icon="import" />
        <IconButton icon="dots" />
      </div>
    </div>
  );
};

export default ProjectCard;
