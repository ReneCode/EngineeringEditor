import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import ProjectOverview from "./ProjectOverview/ProjectOverview";
import ProjectView from "./ProjectView";

const Routing = () => {
  return (
    <div
      className="Routing"
      onContextMenu={ev => {
        ev.stopPropagation();
        ev.preventDefault();
      }}>
      <Route exact path="/" component={Home} />
      <Route exact path="/project" component={ProjectOverview} />
      <Route exact path="/p/:projectId" component={ProjectView} />
      <Route
        exact
        path="/p/:projectId/s/:pageId"
        component={ProjectView}
      />
    </div>
  );
};

export default Routing;
