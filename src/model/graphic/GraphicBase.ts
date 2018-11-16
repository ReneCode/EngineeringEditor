import deepClone from "../../common/deepClone";
import { GraphicType } from "../types";

class GraphicBase {
  // clone(): ContentBase {
  //   return deepClone(this);
  // }

  type: GraphicType;

  constructor(type: GraphicType) {
    this.type = type;
  }

  // will be overwritten by class that extends this class
  toJSON(): object {
    return {};
  }

  // toJSON(): object {
  //   const result: any = (<any>Object).assign({}, this);
  //   return result;
  // }
}

export default GraphicBase;
