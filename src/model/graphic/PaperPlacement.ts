import Paper from "paper";
import Placement from "../Placement";
import deepClone from "../../common/deepClone";
import Point from "../../common/point";

class PaperPlacement extends Placement {
  constructor(private _paperItem: Paper.Item) {
    super("#paper");
  }

  toJsonContent = () => {
    return this._paperItem.exportJSON({ asString: false });
  };

  translate(pt: Point): Placement {
    const newPaperItem = this._paperItem.clone();
    const newPlacement = deepClone(this);
    newPlacement._paperItem = newPaperItem;
    newPaperItem.position = newPaperItem.position.add(
      new Paper.Point(pt.x, pt.y),
    );
    newPlacement.paperItem = newPaperItem;
    return newPlacement;
  }

  paperDraw() {
    return this._paperItem.clone();
    // const item = new Paper.Path();
    // item.replaceWith(this.paperItem);
    // return item;
  }
}

export default PaperPlacement;
