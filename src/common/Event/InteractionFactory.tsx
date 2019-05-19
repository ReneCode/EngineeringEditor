import React from "react";
import IacCircle from "../interaction/IacCircle";
import IacUndoRedo from "../interaction/IacUndoRedo";
import IacSnapGrid from "../interaction/IacSnapGrid";
import IacRectangle from "../interaction/IacRectangle";
import IacDelete from "../interaction/IacDelete";
import IacZoomInOut from "../interaction/IacZoomInOut";
import IacIdle from "../interaction/IacIdle";
import IacSelectPaperItem from "../interaction/IacSelectPaperItem";
import IacDrawCanvas from "../interaction/IacDrawCanvas";
import IacSelectAll from "../interaction/IacSelectAll";
import IacCreateArc from "../interaction/IacCreateArc";
import IacHoverItem from "../interaction/IacHoverItem";
import IacMove from "../interaction/IacMove";
import IacCreateLine from "../interaction/IacCreateLine";
import IacEditItem from "../interaction/IacEditItem";

class InteractionFactory {
  static create(name: string): JSX.Element {
    const props = { key: name };
    switch (name) {
      case "Move":
        return <IacMove {...props} />;
      case "HoverItem":
        return <IacHoverItem {...props} />;
      case "DrawCanvas":
        return <IacDrawCanvas {...props} />;
      case "Idle":
        return <IacIdle {...props} />;
        break;
      case "SelectAll":
        return <IacSelectAll {...props} />;
      case "EditItem":
        return <IacEditItem {...props} />;
      case "SelectPaperItem":
        return <IacSelectPaperItem {...props} />;
      // case "Zoom":
      //   interaction = new InteractionZoom(context);
      //   break;
      // case "Line":
      //   interaction = new InteractionLine(context);
      //   break;
      case "CreateArc":
        return <IacCreateArc {...props} />;
      case "CreateLine":
        return <IacCreateLine {...props} />;
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
