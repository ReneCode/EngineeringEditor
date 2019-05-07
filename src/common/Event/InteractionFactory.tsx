import React from "react";
import IacSelect from "../interaction/IacSelect";
import IacCircle from "../interaction/IacCircle";

class InteractionFactory {
  static create(name: string): JSX.Element {
    switch (name) {
      case "Select":
        return <IacSelect key={name} />;
        break;
      // case "Zoom":
      //   interaction = new InteractionZoom(context);
      //   break;
      // case "Line":
      //   interaction = new InteractionLine(context);
      //   break;
      case "Circle":
        return <IacCircle key={name} />;
      default:
        throw new Error(`InteractionName not registered: ${name}`);
    }
  }
}

export default InteractionFactory;
