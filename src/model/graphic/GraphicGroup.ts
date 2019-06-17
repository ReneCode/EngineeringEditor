import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import { ItemName } from "../../common/ItemMetaData";
import configuration from "../../common/configuration";
import ObjectFactory from "../ObjectFactory";

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

  setMode(drawMode: DrawMode) {
    if (drawMode === this._drawMode) {
      return;
    }
    this._drawMode = drawMode;

    this.drawTempItems();
  }

  paperDraw(): Paper.Item {
    const item = this.createPaperItem();

    if (this._item) {
      this._item.replaceWith(item);
    }
    this._item = item;
    return item;
  }

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {}

  dragItem(event: Paper.MouseEvent) {
    if (this._item) {
      this.translate(event.delta);
      this.paperDraw();
    }
  }

  translate(delta: Paper.Point) {
    for (let child of this.children) {
      child.translate(delta);
    }
  }

  private drawTempItems(selectedGripId: number = 0) {
    if (this._tempItems) {
      for (let item of this._tempItems) {
        item.remove();
      }
    }
    this._tempItems = [];
    switch (this._drawMode) {
      //   case "hover":
      //     {
      //       const item = this.createPaperItem(ItemName.temp);
      //       item.strokeColor = configuration.selectionColor;
      //       item.strokeWidth = 2;
      //       this._tempItems.push(item);
      //     }
      //     break;
      // case "select":
      case "select":
        {
          const item = this.createOutline(ItemName.temp);
          if (item) {
            item.strokeColor = configuration.modeSelectColor;
            this._tempItems.push(item);
          }
        }
        break;
    }
  }

  private createOutline(name: string | undefined): Paper.Item | null {
    if (this._item) {
      const outline = new Paper.Path.Rectangle(this._item.bounds);
      if (name) {
        outline.name = name;
      }
      return outline;
    }
    return null;
  }

  createPaperItem(): Paper.Group {
    const group = new Paper.Group();
    group.data = this.id;
    group.name = ItemName.itemGroup;

    // const childItems = this.children.map(c => c.createPaperItem());
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
