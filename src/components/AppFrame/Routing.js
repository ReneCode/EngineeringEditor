import React from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import ProjectOverview from "../ProjectOverview";
import ProjectView from "../ProjectView";

const Routing = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/project" component={ProjectOverview} />
      <Route exact path="/p/:id" component={ProjectView} />
    </div>
  );
};

export default Routing;
