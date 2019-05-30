import React from "react";

import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar, { ToolbarItemDef } from "./Toolbar";

const DrawToolbar = () => {
  const items: ToolbarItemDef[] = [
    {
      text: "S",
      onClick: () => {
        appEventDispatcher.dispatch("stopInteraction");
      },
    },
    {
      text: "C",
      onClick: () => {
        appEventDispatcher.dispatch("startInteraction", "CreateArc");
      },
    },
    {
      text: "L",
      onClick: () => {
        appEventDispatcher.dispatch("startInteraction", "CreateLine");
      },
    },
  ];
  return (
    <Toolbar
      className="draw-toolbar"
      direction="column"
      items={items}
    />
  );
};

export default DrawToolbar;
