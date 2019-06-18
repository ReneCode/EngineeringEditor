import React from "react";
import IacUndoRedo from "../interaction/IacUndoRedo";
import IacSnapGrid from "../interaction/IacSnapGrid";
import IacRectangle from "../interaction/IacRectangle";
import IacDelete from "../interaction/IacDelete";
import IacZoomInOut from "../interaction/IacZoomInOut";
import IacSelectAll from "../interaction/IacSelectAll";
import IacCreateArc from "../interaction/IacCreateArc";
import IacHoverItem from "../interaction/IacHoverItem";
import IacCreateLine from "../interaction/IacCreateLine";
import IacEditItem from "../interaction/IacEditItem";
import IacSelect from "../interaction/IacSelect";
import IacPreviousNextPage from "../interaction/IacPreviousNextPage";
import IacExportSvg from "../interaction/IacExportSvg";
import IacChangeProperty from "../interaction/IacChangeProperty";
import IacGroup from "../interaction/IacGroup";
import IacUngroup from "../interaction/IacUngroup";
import IacCreateSymbolAndSymbolRef from "../interaction/IacCreateSymbolAndSymbolRef";
import IacPlaceSymbol from "../interaction/IacPlaceSymbol";
import IacCreateText from "../interaction/IacCreateText";
import IacCreateConnectionPoint from "../interaction/IacCreateConnectionPoint";

class InteractionFactory {
  static create(name: string, iaProps: any = {}): JSX.Element {
    const props = { ...iaProps, key: name };
    switch (name) {
      case "IacCreateConnectionPoint":
        return <IacCreateConnectionPoint {...props} />;
      case "IacPlaceSymbol":
        return <IacPlaceSymbol {...props} />;
      case "IacCreateSymbolAndSymbolRef":
        return <IacCreateSymbolAndSymbolRef {...props} />;
      case "IacGroup":
        return <IacGroup {...props} />;
      case "IacUngroup":
        return <IacUngroup {...props} />;
      case "IacChangeProperty":
        return <IacChangeProperty {...props} />;
      case "IacExportSvg":
        return <IacExportSvg {...props} />;
      case "IacPreviousNextPage":
        return <IacPreviousNextPage {...props} />;
      case "HoverItem":
        return <IacHoverItem {...props} />;
      case "IacSelectAll":
        return <IacSelectAll {...props} />;
      case "IacEditItem":
        return <IacEditItem {...props} />;
      case "IacSelect":
        return <IacSelect {...props} />;
      case "CreateText":
        return <IacCreateText {...props} />;
      case "CreateArc":
        return <IacCreateArc {...props} />;
      case "CreateLine":
        return <IacCreateLine {...props} />;
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
