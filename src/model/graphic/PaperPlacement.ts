import Paper from "paper";
import Placement from "../Placement";
import deepClone from "../../common/deepClone";
import Point from "../../common/point";

class PaperPlacement extends Placement {
  constructor(private _paperItem: Paper.Item) {
    super("#paper");
  }

  toJsonContent(): string {
    return this._paperItem.exportJSON({ asString: false });
  }

  translate(pt: Point): Placement {
    // console.log(":", this._paperItem.position);
    const newPaperItem = this._paperItem.clone();
    const newPlacement = deepClone(this);
    newPlacement._paperItem = newPaperItem;
    newPaperItem.position = newPaperItem.position.add(
      new Paper.Point(pt.x, pt.y),
    );
    // newPaperItem.data = this._paperItem.data;
    // newPaperItem.data.placement = newPlacement;
    newPlacement.paperItem = newPaperItem;
    // console.log(":", newPlacement._paperItem.position);
    return newPlacement;
  }

  paperDraw() {
    console.log("paperDraw");
    return this._paperItem.clone();
  }

  // getPaperItem = () => {
  //   return this._paperItem.clone();
  // };
}

export default PaperPlacement;
