import React from "react";

import DeviceIcon from "./DeviceIcon";
import RocketIcon from "./RocketIcon";
import { Container, IconContainer } from "./elements";

const Navigation = () => {
  return (
    <Container>
      <h4>root</h4>
      <IconContainer>
        <RocketIcon />
      </IconContainer>

      <IconContainer>
        <DeviceIcon />
      </IconContainer>
    </Container>
  );
};

export default Navigation;
