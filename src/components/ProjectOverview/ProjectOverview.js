import React, { Component } from "react";
import { withRouter } from "react-router";
import ProjectCard from "./ProjectCard";
import ProjectAddCard from "./ProjectAddCard";
import NewProjectModal from "./NewProjectModal";
import { graphql } from "../../common/graphql-api";

import "./ProjectOverview.scss";

let SERVER = process.env.REACT_APP_GRAPHQL_SERVER;
const urlPersistence = `${SERVER}/persistence/projects`;

class ProjectOverview extends Component {
  state = {
    projects: [],
    projectFileNames: [],
    selectedProjectName: "",
    showNewProjectModal: false,
  };

  componentDidMount() {
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
      const json = await result.json();
      await this.loadProjects();
      return json.id;
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

  onExport = async project => {
    try {
      const url = urlPersistence + `/${project.name}`;
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(project),
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  onClickSelectProject = async project => {
    if (this.state.selectedProjectName === project.name) {
      let id = project.id;
      if (!id) {
        id = await this.importProject(project.name);
      }
      this.props.history.push(`/p/${id}`);
    } else {
      this.setState({
        selectedProjectName: project.name,
      });
    }
  };

  onClickAddProject = () => {};

  onClickMoreProject = () => {};

  render() {
    const allProjects = this.state.projects.map(p => p);
    this.state.projectFileNames.forEach(name => {
      if (!allProjects.find(f => f.name === name)) {
        allProjects.push({ name, id: null });
      }
    });

    return (
      <div>
        <div data-testid="projectlist" className="projectlist">
          <ProjectAddCard onClick={this.onClickCreateProject} />
          {allProjects.map((p, index) => {
            return (
              <ProjectCard
                key={index}
                project={p}
                active={this.state.selectedProjectName === p.name}
                onClick={this.onClickSelectProject}
                onExport={p.id && this.onExport}
                // onImport={p => this.onImportProject(p.name)}
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

export default withRouter(ProjectOverview);
