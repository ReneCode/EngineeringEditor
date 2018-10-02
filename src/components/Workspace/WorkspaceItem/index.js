import React from "react";

import { ChildContainer } from "./elements";

const WorkspaceItem = props => {
  return <ChildContainer>{props.children}</ChildContainer>;
};

export default WorkspaceItem;
