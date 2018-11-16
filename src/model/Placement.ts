import deepClone from "../common/deepClone";

import GraphicBase from "./graphic/GraphicBase";
import { IdType } from "./types";
import GraphicLine from "./graphic/GraphicLine";
import GraphicFactory from "./graphic/GraphicFactory";

interface PlacementJsonType {
  projectId: IdType;
  pageId: IdType;
  id: IdType;
  graphic: string;
}

class Placement {
  id: IdType;
  pageId: IdType;
  projectId: IdType;
  graphic: GraphicBase;
  // logic: LogicBase;  // device

  constructor(
    projectId: IdType,
    pageId: IdType,
    graphic: GraphicBase,
  ) {
    this.projectId = projectId;
    this.pageId = pageId;
    this.graphic = graphic;
    this.id = "";
  }

  toJSON(): PlacementJsonType {
    const result: PlacementJsonType = {
      projectId: this.projectId,
      pageId: this.pageId,
      id: this.id,
      graphic: "",
    };
    if (this.graphic) {
      const graphicJson = this.graphic.toJSON();
      result.graphic = JSON.stringify(graphicJson);
    }
    return result;
  }

  static fromJSON(json: PlacementJsonType): Placement {
    const jsonGraphic = JSON.parse(json.graphic);
    const graphic = <GraphicBase>GraphicFactory.fromJSON(jsonGraphic);
    const placement = new Placement(
      json.projectId,
      json.pageId,
      graphic,
    );
    placement.id = json.id;
    return placement;
  }

  draw() {}

  // clone(): PlacementBase {
  //   return deepClone(this);
  // }

  // static getContent(json: any): any | null {
  //   if (json.content) {
  //     return JSON.parse(json.content);
  //   } else {
  //     return null;
  //   }
  // }

  // static setContent(json: any, content: any) {
  //   json.content = JSON.stringify(content);
  // }

  // static deleteContent(json: any) {
  //   delete json.content;
  // }

  // toJSON(): object {
  //   const result: any = (<any>Object).assign({}, this);
  //   return result;
  // }

  // toJsonWithContent(): object {
  //   return this.toJSON();
  // }
}

export default Placement;
