import React from "react";

import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar, { ToolbarItemDef } from "./Toolbar";

const DrawToolbar = () => {
  const items: ToolbarItemDef[] = [
    {
      text: "1",
      onClick: () => {
        appEventDispatcher.dispatch("zoomIn");
      },
    },
    {
      text: "2",
      onClick: () => {
        appEventDispatcher.dispatch("zoomOut");
      },
    },
    {
      text: "L",
      onClick: () => {
        appEventDispatcher.dispatch("zoomOut");
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
