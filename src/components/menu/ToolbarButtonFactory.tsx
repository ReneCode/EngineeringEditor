import React from "react";
import Placement from "../../model/Placement";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

type ToolbarButtonName =
  | "selectPlaceSymbol"
  | "createSymbolRef"
  | "stopInteraction"
  | "createArc"
  | "createLine"
  | "group"
  | "ungroup"
  | "createSymbol";

class ToolbarButtonFactory {
  static create(
    name: ToolbarButtonName,
    options: { placements?: Placement[] } = {},
  ) {
    switch (name) {
      case "selectPlaceSymbol":
        return (
          <button
            onClick={event =>
              appEventDispatcher.dispatch("selectPlaceSymbol", event)
            }>
            /sy
          </button>
        );

      case "createSymbolRef":
        return (
          <button
            onClick={() =>
              appEventDispatcher.dispatch(
                "startInteraction",
                "IacCreateSymbolRef",
              )
            }>
            syR
          </button>
        );

      case "stopInteraction":
        return (
          <button
            onClick={() =>
              appEventDispatcher.dispatch("stopInteraction")
            }>
            S
          </button>
        );

      case "createLine":
        return (
          <button
            onClick={() =>
              appEventDispatcher.dispatch(
                "startInteraction",
                "CreateLine",
              )
            }>
            L
          </button>
        );

      case "createArc":
        return (
          <button
            onClick={() =>
              appEventDispatcher.dispatch(
                "startInteraction",
                "CreateArc",
              )
            }>
            C
          </button>
        );

      case "createSymbol": {
        return (
          <button
            onClick={() => {
              appEventDispatcher.dispatch(
                "createSymbolAndSymbolRef",
                { placements: options.placements },
              );
            }}>
            sym
          </button>
        );
      }
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
