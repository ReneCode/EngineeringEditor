import React, { Component } from "react";
import ProjectCard from "./ProjectCard";
import NewProjectModal from "./NewProjectModal";
import { graphql } from "../../common/graphql-api";

class ProjectOverview extends Component {
  state = {
    projects: [],
    showNewProjectModal: false,
  };

  async componentDidMount() {
    const res = await graphql(`
      {
        projects {
          id
          name
        }
      }
    `);
    this.setState({
      projects: res.projects,
    });
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

    const query = `mutation CreateProject($input: ProjectInput!) {
      createProject(input: $input) { id name }
    }`;
    const variables = {
      input: {
        name: name,
      },
    };
    const result = await graphql(query, variables);
    const newProject = result.createProject;

    this.setState(state => ({
      projects: state.projects.concat(newProject),
    }));
  };

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
