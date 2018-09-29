import React from "react";

import SplitPane from "react-split-pane";
import { Container } from "./elements";
import { FullScreen } from "../common";

import Header from "../Header";
import Navigation from "../Navigation";
import Content from "../Content";
import Workspace from "../Workspace";

const App = () => {
  return (
    <Container>
      <Header />
      <FullScreen>
        <Navigation />
        <SplitPane split="vertical" defaultSize={100} minSize={0}>
          <Workspace />
          <Content />
        </SplitPane>
      </FullScreen>
    </Container>
  );
};

export default App;
