import React from "react";

import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import Toolbar, { ToolbarItemDef } from "./Toolbar";

const ZoomToolbar = () => {
  const items: ToolbarItemDef[] = [
    {
      text: "+",
      onClick: () => {
        appEventDispatcher.dispatch("zoomIn");
      },
    },
    {
      text: "-",
      onClick: () => {
        appEventDispatcher.dispatch("zoomOut");
      },
    },
  ];
  return <Toolbar className="zoom-toolbar" items={items} />;
};

export default ZoomToolbar;
