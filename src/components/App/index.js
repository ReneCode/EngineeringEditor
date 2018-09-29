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
        <div
          style={{
            position: "fixed",
            left: "calc(4rem + 1px)",
            top: "3rem",
            right: 0,
            bottom: 0
          }}
        >
          <SplitPane
            split="vertical"
            defaultSize={200}
            minSize={0}
            pane2Style={{ height: "100%" }}
          >
            <Workspace />
            <Content />
          </SplitPane>
        </div>
      </FullScreen>
    </Container>
  );
};

export default App;
