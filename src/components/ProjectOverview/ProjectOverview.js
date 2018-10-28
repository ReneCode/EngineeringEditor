import React, { Component } from "react";
import ProjectCard from "./ProjectCard";
import getUrl from "../../common/getUrl";
import NewProjectModal from "./NewProjectModal";

class ProjectOverview extends Component {
  state = {
    projects: [],
    showNewProjectModal: false,
  };

  async componentDidMount() {
    const url = getUrl("projects");
    try {
      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        projects: json,
      });
    } catch (ex) {}
  }

  onClickCreateProject = () => {
    this.setState({
      showNewProjectModal: true,
    });
  };

  onCloseModal = async name => {
    this.setState({
      showNewProjectModal: false,
    });

    if (!name) {
      return;
    }

    const project = {
      name,
    };

    const newProject = await this.saveProject(project);
    this.setState(state => ({
      projects: state.projects.concat(newProject),
    }));
  };

  async saveProject(project) {
    const url = getUrl("projects");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const json = await res.json();
      return json;
    } catch (ex) {}
  }

  render() {
    return (
      <div>
        <div className="button" onClick={this.onClickCreateProject}>
          Create Project
        </div>
        <div className="projectlist">
          {this.state.projects.map(p => {
            return <ProjectCard key={p.id} project={p} />;
          })}
        </div>
        <NewProjectModal
          show={this.state.showNewProjectModal}
          onClose={this.onCloseModal}
        />
      </div>
    );
  }
}

export default ProjectOverview;
