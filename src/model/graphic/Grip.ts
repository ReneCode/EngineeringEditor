import Paper from "paper";
import { ItemName } from "../../common/ItemMetaData";

class Grip {
  private radius = 5;
  private item: Paper.Path;

  constructor(public pt: Paper.Point, public id: number) {
    this.item = new Paper.Path.Circle(this.pt, this.radius);
    this.item.fillColor = "yellow";
    this.item.strokeColor = "black";
    this.item.name = ItemName.grip;
    this.item.data = id;
  }

  setPosition(pt: Paper.Point) {
    this.item.position = pt;
  }

  remove() {
    this.item.remove();
  }
}

export default Grip;
