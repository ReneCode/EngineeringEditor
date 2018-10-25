import React, { Component } from "react";

import { Container } from "./elements";
import Canvas from "./Canvas";

class Content extends Component {
  render() {
    return (
      <Container>
        <Canvas />
      </Container>
    );
  }
}

export default Content;
