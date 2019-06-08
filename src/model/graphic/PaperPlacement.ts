import Paper from "paper";
import Placement from "../Placement";
import deepClone from "../../common/deepClone";
import Point from "../../common/point";
import { ItemMetaData } from "../../common/ItemMetaData";

class PaperPlacement extends Placement {
  constructor(private _paperItem: Paper.Item) {
    super("#paper");
    debugger;
  }

  toJsonContent(): string {
    return this._paperItem.exportJSON({ asString: true });
  }

  translate(pt: Paper.Point): Placement {
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
    this.setMetaData();
    return newPlacement;
  }

  fitToRect(rect: Paper.Rectangle): PaperPlacement {
    const newPaperItem = this._paperItem.clone();
    const newPlacement = deepClone(this);
    newPaperItem.fitBounds(rect);
    newPlacement._paperItem = newPaperItem;
    this.setMetaData();
    return newPlacement;
  }

  getPaperItem() {
    return this._paperItem;
  }

  setMetaData() {
    const metaData: ItemMetaData = {
      placement: this,
      rev: 1,
    };
    // TODO currently not working with Undo/Redo :-(
    // this._paperItem.data = metaData;
  }
}

export default PaperPlacement;
