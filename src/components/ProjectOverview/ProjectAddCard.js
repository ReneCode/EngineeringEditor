import React from "react";

import "./ProjectCard.scss";

const ProjectCard = ({ onClick }) => {
  return (
    <div className="projectcard" onClick={onClick}>
      <div className="add-project">+ New Project</div>
    </div>
  );
};

export default ProjectCard;
