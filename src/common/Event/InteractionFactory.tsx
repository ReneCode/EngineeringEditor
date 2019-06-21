import React from "react";
import IacSnapGrid from "../interaction/IacSnapGrid";
import IacRectangle from "../interaction/IacRectangle";
import IacCreateArc from "../interaction/IacCreateArc";
import IacHoverItem from "../interaction/IacHoverItem";
import IacCreateLine from "../interaction/IacCreateLine";
import IacEditItem from "../interaction/IacEditItem";
import IacSelect from "../interaction/IacSelect";
import IacPreviousNextPage from "../interaction/IacPreviousNextPage";
import IacExportSvg from "../interaction/IacExportSvg";
import IacChangeProperty from "../interaction/IacChangeProperty";
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
      case "IacChangeProperty":
        return <IacChangeProperty {...props} />;
      case "IacExportSvg":
        return <IacExportSvg {...props} />;
      case "IacPreviousNextPage":
        return <IacPreviousNextPage {...props} />;
      case "HoverItem":
        return <IacHoverItem {...props} />;
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
      case "SnapGrid":
        return <IacSnapGrid {...props} />;
      default:
        throw new Error(`InteractionName not registered: ${name}`);
    }
  }
}

export default InteractionFactory;
