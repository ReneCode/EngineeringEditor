import React from "react";

import { ItemTitle, Container } from "./elements";

import Devices from "./Devices";

const Workspace = () => {
  const component = <Devices />;

  return (
    <Container>
      <ItemTitle>Devices.</ItemTitle>
      <div style={{ flex: 1, overflowY: "auto" }}>{component}</div>
    </Container>
  );
};

export default Workspace;
