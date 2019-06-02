import React from "react";
import Placement from "../../model/Placement";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

type ToolbarButtonName = "group" | "ungroup";

class ToolbarButtonFactory {
  static create(
    name: ToolbarButtonName,
    options: { placements: Placement[] },
  ) {
    switch (name) {
      case "ungroup": {
        return (
          <button
            onClick={() =>
              appEventDispatcher.dispatch("ungroup", {
                placements: options.placements,
              })
            }>
            ungr
          </button>
        );
      }

      case "group": {
        return (
          <button
            onClick={() =>
              appEventDispatcher.dispatch("group", {
                placements: options.placements,
              })
            }>
            grp
          </button>
        );
      }

      default:
        throw new Error("bad button-name:" + name);
    }
  }
}

export default ToolbarButtonFactory;
