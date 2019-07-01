import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import { ItemName } from "../../common/ItemName";
import configuration from "../../common/configuration";
import ObjectFactory from "../ObjectFactory";
import { copyOwnProperties } from "../../common/deepClone";

class GraphicGroup extends Placement {
  constructor(public children: Placement[]) {
    super("group");
  }

  static fromJSON(json: any): GraphicGroup {
    const group = Object.create(GraphicGroup.prototype);
    return Object.assign(group, json, {
      children: ObjectFactory.fromJSON(json.children),
    });
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      children: this.children.map(c => c.toJSON()),
    };
  }

  public clone(): GraphicGroup {
    const clone = new GraphicGroup([]);
    copyOwnProperties(clone, this);
    clone.children = this.children.map(p => p.clone());
    return clone;
  }

  public paperDraw(drawMode: DrawMode = null): Paper.Item {
    switch (drawMode) {
      case null:
        this.removeTempItems();
        this.setPaperItem(this.createPaperItem());
        break;
      case "highlight":
        {
          const item = this.createOutline(ItemName.temp);
          item.strokeColor = configuration.modeHighlightColor;
          this.addTempItem(item);
        }
        break;
      case "select":
        {
          const item = this.createOutline(ItemName.temp);
          item.strokeColor = configuration.modeSelectColor;
          this.addTempItem(item);

          // this.children.forEach(p => p.paperDraw("select"));
        }
        break;
    }
    return this.getPaperItem();
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {}

  translate(delta: Paper.Point) {
    for (let child of this.children) {
      child.translate(delta);
    }
  }

  private createOutline(name: string | undefined): Paper.Item {
    const outline = new Paper.Path.Rectangle(this._item.bounds);
    if (name) {
      outline.name = name;
    }
    return outline;
  }

  createPaperItem(): Paper.Group {
    const group = new Paper.Group();
    group.data = this.id;
    group.name = ItemName.itemGroup;

    const childItems = this.children.map(c => c.paperDraw());

    group.addChildren(childItems);
    if (this.color) {
      group.strokeColor = this.color;
    }
    if (this.fill) {
      group.fillColor = this.fill;
    }

    return group;
  }
}

export default GraphicGroup;
