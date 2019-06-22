import React from "react";
import appEventDispatcher from "../../common/Event/AppEventDispatcher";
import IconButton from "../common/IconButton";

type ToolbarButtonName =
  | "delete"
  | "rotate"
  | "createConnectionPoint"
  | "createText"
  | "selectPlaceSymbol"
  | "stopInteraction"
  | "createArc"
  | "createLine"
  | "group"
  | "ungroup"
  | "createSymbolAndSymbolRef";

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
          <button key={name}>
            <IconButton
              icon="pencil"
              onClick={() =>
                appEventDispatcher.dispatch("stopInteraction")
              }
            />
          </button>
        );

      case "createText":
        return (
          <button key={name}>
            <IconButton
              icon="text"
              onClick={() =>
                appEventDispatcher.dispatch(
                  "startInteraction",
                  "CreateText",
                )
              }
            />
          </button>
        );

      case "createLine":
        return (
          <button key={name}>
            <IconButton
              icon="line"
              onClick={() =>
                appEventDispatcher.dispatch(
                  "startInteraction",
                  "CreateLine",
                )
              }
            />
          </button>
        );

      case "createArc":
        return (
          <button key={name}>
            <IconButton
              icon="arc"
              onClick={() =>
                appEventDispatcher.dispatch(
                  "startInteraction",
                  "CreateArc",
                )
              }
            />
          </button>
        );

      case "createConnectionPoint":
        return (
          <button key={name}>
            <IconButton
              icon="connectionpoint"
              onClick={() =>
                appEventDispatcher.dispatch(
                  "startInteraction",
                  "IacCreateConnectionPoint",
                )
              }
            />
          </button>
        );

      case "createSymbolAndSymbolRef": {
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

      case "group":
        return (
          <button
            key={name}
            onClick={() =>
              appEventDispatcher.dispatch("group", ...params)
            }>
            grp
          </button>
        );

      case "delete":
        return (
          <button key={name}>
            <IconButton
              icon="delete"
              onClick={() =>
                appEventDispatcher.dispatch(name, ...params)
              }
            />
          </button>
        );

      case "rotate":
        return (
          <button key={name}>
            <IconButton
              icon="rotateleft"
              onClick={() =>
                appEventDispatcher.dispatch(name, ...params)
              }
            />
          </button>
        );

      default:
        throw new Error("bad button-name:" + name);
    }
  }
}

export default ToolbarButtonFactory;
