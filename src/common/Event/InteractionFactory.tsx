import React from "react";
import IacCircle from "../interaction/IacCircle";
import IacUndoRedo from "../interaction/IacUndoRedo";
import IacSnapGrid from "../interaction/IacSnapGrid";
import IacRectangle from "../interaction/IacRectangle";
import IacDelete from "../interaction/IacDelete";
import IacZoomInOut from "../interaction/IacZoomInOut";
import IacIdle from "../interaction/IacIdle";
import IacSelectAll from "../interaction/IacSelectAll";
import IacCreateArc from "../interaction/IacCreateArc";
import IacHoverItem from "../interaction/IacHoverItem";
import IacCreateLine from "../interaction/IacCreateLine";
import IacEditItem from "../interaction/IacEditItem";
import IacSelect from "../interaction/IacSelect";
import IacPreviousNextPage from "../interaction/IacPreviousNextPage";
import IacExportSvg from "../interaction/IacExportSvg";
import IacChangeProperty from "../interaction/IacChangeProperty";

class InteractionFactory {
  static create(name: string): JSX.Element {
    const props = { key: name };
    switch (name) {
      case "IacChangeProperty":
        return <IacChangeProperty {...props} />;
      case "IacExportSvg":
        return <IacExportSvg {...props} />;
      case "IacPreviousNextPage":
        return <IacPreviousNextPage {...props} />;
      case "HoverItem":
        return <IacHoverItem {...props} />;
      case "Idle":
        return <IacIdle {...props} />;
      case "IacSelectAll":
        return <IacSelectAll {...props} />;
      case "IacEditItem":
        return <IacEditItem {...props} />;
      case "IacSelect":
        return <IacSelect {...props} />;
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
