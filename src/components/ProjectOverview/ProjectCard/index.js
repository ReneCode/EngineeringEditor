import React from "react";
import { Link } from "react-router-dom";

import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="projectcard">
      <Link to={`p/${project.id}`}>{project.name}</Link>
    </div>
  );
};

export default ProjectCard;
