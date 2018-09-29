import React from "react";

import { ItemTitle, Container } from "./elements";

const Workspace = () => {
  const component = <div>hallo</div>;

  return (
    <Container>
      <ItemTitle>Headline</ItemTitle>
      <div style={{ flex: 1, overflowY: "auto" }}>{component}</div>
    </Container>
  );
};

export default Workspace;
