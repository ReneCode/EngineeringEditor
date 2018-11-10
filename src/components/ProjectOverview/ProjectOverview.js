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

    // const url = getUrl("projects");
    // try {
    //   const res = await fetch(url);
    //   const json = await res.json();
    //   this.setState({
    //     projects: json,
    //   });
    // } catch (ex) {}
  }

  // async loadProjects() {
  //   try {
  //     const cmd = {
  //       query: `{
  //         projects { id name }
  //       }`,
  //     };
  //     const url = "http://localhost:8080/graphql";
  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(cmd),
  //     });
  //     const j = await res.json();
  //     return j.data;
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

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

    const newProject = await this.saveProject(name);
    this.setState(state => ({
      projects: state.projects.concat(newProject),
    }));
  };

  async saveProject(name) {
    const query = `mutation CreateProject($name: String!) {
      createProject(name: $name) { id name }
    }`;

    const variables = {
      name: name,
    };

    const res = await graphql(query, variables);
    return res.createProject;

    // const url = getUrl("projects");
    // try {
    //   const res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(project),
    //   });
    //   const json = await res.json();
    //   return json;
    // } catch (ex) {}
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
