import Paper from "paper";
import Placement from "../Placement";

class GraphicDummy extends Placement {
  pt: Paper.Point = new Paper.Point(0, 0);

  constructor() {
    super("");
  }

  static fromJSON(json: any): GraphicDummy {
    const dummy = Object.create(GraphicDummy.prototype);
    return Object.assign(dummy, json, {
      pt: new Paper.Point(Math.random() * 400, Math.random() * 400),
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
    };
  }

  paperDraw(): Paper.Item {
    console.log("Dummy");
    const item = new Paper.Path.Star(this.pt, 8, 30, 80);
    item.fillColor = "#88888822";
    item.strokeColor = "#ff333388";
    return item;
  }
}

export default GraphicDummy;
