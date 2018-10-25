import React, { Component } from "react";
import ProjectCard from "./ProjectCard";

class ProjectOverview extends Component {
  state = {
    projects: [],
  };

  newProject = () => {
    const id = Math.floor(Math.random() * 100);

    const project = {
      name: "Project-" + id,
      id,
    };
    this.setState(state => ({
      projects: state.projects.concat(project),
    }));
  };

  render() {
    return (
      <div>
        <button className="button" onClick={this.newProject}>
          New Project
        </button>
        <div className="projectlist">
          {this.state.projects.map(p => {
            return <ProjectCard project={p} />;
          })}
        </div>
      </div>
    );
  }
}

export default ProjectOverview;
