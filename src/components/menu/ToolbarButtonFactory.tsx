import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";

type ToolbarButtonName =
  | "IacCreateConnectionPoint"
  | "createText"
  | "selectPlaceSymbol"
  | "stopInteraction"
  | "createArc"
  | "createLine"
  | "group"
  | "ungroup"
  | "createSymbol";

class ToolbarButtonFactory {
  static create(name: ToolbarButtonName, ...params: any) {
    switch (name) {
      case "selectPlaceSymbol":
        return (
          <button
            key={name}
            onClick={event =>
              appEventDispatcher.dispatch(
                "showModal",
                "selectSymbol",
                event,
              )
            }>
            sy
          </button>
        );

      case "stopInteraction":
        return (
          <button
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch("stopInteraction")
            }>
            {"/"}
          </button>
        );

      case "createText":
        return (
          <button
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch(
                "startInteraction",
                "CreateText",
              )
            }>
            T
          </button>
        );

      case "createLine":
        return (
          <button
            key={name}
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
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch(
                "startInteraction",
                "CreateArc",
              )
            }>
            O
          </button>
        );

      case "IacCreateConnectionPoint":
        return (
          <button
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch("startInteraction", name)
            }>
            cp
          </button>
        );

      case "createSymbol": {
        return (
          <button
            key={name}
            onClick={() => {
              appEventDispatcher.dispatch(
                "createSymbolAndSymbolRef",
                ...params,
              );
            }}>
            sym
          </button>
        );
      }
      case "ungroup": {
        return (
          <button
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch("ungroup", ...params)
            }>
            ungr
          </button>
        );
      }

      case "group": {
        return (
          <button
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch("group", ...params)
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
