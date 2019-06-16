import Paper from "paper";
import Placement from "../Placement";

class GraphicDummy extends Placement {
  constructor() {
    super("");
  }

  static fromJSON(json: any): GraphicDummy {
    const text = Object.create(GraphicDummy.prototype);
    return Object.assign(text, json, {});
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
    };
  }

  paperDraw(): Paper.Item {
    console.log("Dummy");
    const item = new Paper.Path.Star(
      new Paper.Point(Math.random() * 400, Math.random() * 400),
      8,
      30,
      80,
    );
    item.fillColor = "#88888822";
    item.strokeColor = "#ff333388";
    return item;
  }
}

export default GraphicDummy;
