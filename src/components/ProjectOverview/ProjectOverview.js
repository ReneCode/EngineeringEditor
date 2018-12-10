import React, { Component } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFileName from "./ProjectFileName";
import NewProjectModal from "./NewProjectModal";
import { graphql } from "../../common/graphql-api";

let SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
const urlPersistence = `${SERVER}/persistence/projects`;

class ProjectOverview extends Component {
  state = {
    projects: [],
    projectFileNames: [],
    showNewProjectModal: false,
  };

  async componentDidMount() {
    this.loadProjectFileNames();
    this.loadProjects();
  }

  loadProjects = async () => {
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
  };

  loadProjectFileNames = async () => {
    try {
      const result = await fetch(urlPersistence);
      const json = await result.json();
      this.setState({
        projectFileNames: json,
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  importProject = async filename => {
    try {
      const url = urlPersistence + `/${filename}`;
      const result = await fetch(url);
      this.loadProjects();
    } catch (ex) {
      console.log(ex);
    }
  };

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

    const query = `mutation CreateProject($input: CreateProjectInput!) {
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

        <div data-testid="projectlist" className="projectlist">
          {this.state.projects.map(p => {
            return <ProjectCard key={p.id} project={p} />;
          })}
        </div>

        <h3>Project Files</h3>
        <div>
          {this.state.projectFileNames.map(f => {
            return (
              <ProjectFileName
                key={f}
                filename={f}
                onClick={() => this.importProject(f)}
              />
            );
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
