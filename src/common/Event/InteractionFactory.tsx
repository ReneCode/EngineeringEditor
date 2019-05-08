import React from "react";
import IacSelect from "../interaction/IacSelect";
import IacCircle from "../interaction/IacCircle";
import IacUndoRedo from "../../components/interaction/IacUndoRedo";
import IacSnapGrid from "../interaction/IacSnapGrid";
import IacRectangle from "../interaction/IacRectangle";

class InteractionFactory {
  static create(name: string): JSX.Element {
    const props = { key: name };
    switch (name) {
      case "Select":
        return <IacSelect {...props} />;
        break;
      // case "Zoom":
      //   interaction = new InteractionZoom(context);
      //   break;
      // case "Line":
      //   interaction = new InteractionLine(context);
      //   break;
      case "Circle":
        return <IacCircle {...props} />;
      case "Rectangle":
        return <IacRectangle {...props} />;
      case "UndoRedo":
        return <IacUndoRedo {...props} />;
      case "SnapGrid":
        return <IacSnapGrid {...props} />;
      default:
        throw new Error(`InteractionName not registered: ${name}`);
    }
  }
}

export default InteractionFactory;
