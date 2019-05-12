import React from "react";
import IacCircle from "../interaction/IacCircle";
import IacUndoRedo from "../interaction/IacUndoRedo";
import IacSnapGrid from "../interaction/IacSnapGrid";
import IacRectangle from "../interaction/IacRectangle";
import IacDelete from "../interaction/IacDelete";
import IacZoomInOut from "../interaction/IacZoomInOut";
import IacLine from "../interaction/IacLine";
import IacArc from "../interaction/IacArc";
import IacIdle from "../interaction/IacIdle";
import IacSelectPaperItem from "../interaction/IacSelectPaperItem";
import IacDrawCanvas from "../interaction/IacDrawCanvas";

class InteractionFactory {
  static create(name: string): JSX.Element {
    const props = { key: name };
    switch (name) {
      case "DrawCanvas":
        return <IacDrawCanvas {...props} />;
      case "Idle":
        return <IacIdle {...props} />;
        break;
      case "SelectPaperItem":
        return <IacSelectPaperItem {...props} />;
        break;
      // case "Zoom":
      //   interaction = new InteractionZoom(context);
      //   break;
      // case "Line":
      //   interaction = new InteractionLine(context);
      //   break;
      case "Arc":
        return <IacArc {...props} />;
      case "Line":
        return <IacLine {...props} />;
      case "Circle":
        return <IacCircle {...props} />;
      case "Rectangle":
        return <IacRectangle {...props} />;
      case "UndoRedo":
        return <IacUndoRedo {...props} />;
      case "Delete":
        return <IacDelete {...props} />;
      case "SnapGrid":
        return <IacSnapGrid {...props} />;
      case "ZoomInOut":
        return <IacZoomInOut {...props} />;
      default:
        throw new Error(`InteractionName not registered: ${name}`);
    }
  }
}

export default InteractionFactory;
