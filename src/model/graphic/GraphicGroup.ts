import Placement, { DrawMode } from "../Placement";
import Paper from "paper";
import PaperUtil from "../../utils/PaperUtil";
import { ItemName } from "../../common/ItemMetaData";
import configuration from "../../common/configuration";
import ObjectFactory from "../ObjectFactory";

class GraphicGroup extends Placement {
  constructor(public children: Placement[]) {
    super("group");
  }

  static fromJSON(json: any): GraphicGroup {
    const group = Object.create(GraphicGroup.prototype);
    return (<any>Object).assign(group, json, {
      children: ObjectFactory.fromJSON(json.children),
    });
  }

  asJSON(): any {
    return {
      ...super.asJSON(),
      children: this.children.map(c => c.asJSON()),
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

  dragGrip(event: Paper.MouseEvent, gripItem: Paper.Item) {
    // if (this._drawMode !== "edit") {
    //   throw new Error("dragGrip only in edit mode");
    // }
    // gripItem.position = event.point;
    // if (this._item) {
    //   switch (gripItem.data) {
    //     case 1:
    //       this.p1 = event.point;
    //       break;
    //     case 2:
    //       this.p2 = event.point;
    //       break;
    //     default:
    //       throw new Error(`bad index: ${gripItem.data}`);
    //   }
    //   this.paperDraw();
    //   this.drawTempItems(gripItem.data);
    // }
  }

  dragItem(event: Paper.MouseEvent) {
    // if (this._item) {
    //   this.p1 = this.p1.add(event.delta);
    //   this.p2 = this.p2.add(event.delta);
    //   this.paperDraw();
    //   for (let item of this._tempItems) {
    //     item.position = item.position.add(event.delta);
    //   }
    // }
  }

  private drawTempItems(selectedGripId: number = 0) {
    console.log(":group - drawTempItems");
    // if (this._tempItems) {
    //   for (let item of this._tempItems) {
    //     item.remove();
    //   }
    // }
    // this._tempItems = [];
    // switch (this._drawMode) {
    //   case "hover":
    //     {
    //       const item = this.createPaperItem(ItemName.temp);
    //       item.strokeColor = configuration.selectionColor;
    //       item.strokeWidth = 2;
    //       this._tempItems.push(item);
    //     }
    //     break;
    //   case "select":
    //     {
    //       const item = this.createPaperItem(ItemName.temp);
    //       item.strokeColor = configuration.selectionColor;
    //       item.data = "abc";
    //       this._tempItems.push(item);
    //     }
    //     break;
    //   case "edit":
    //     {
    //       const item = this.createPaperItem(ItemName.temp);
    //       item.strokeColor = configuration.selectionColor;
    //       this._tempItems.push(item);
    //       const grips = this.createGrips(selectedGripId);
    //       for (let grip of grips) {
    //         this._tempItems.push(grip);
    //       }
    //     }
    //     break;
    // }
  }

  private createGrips(selectedGripId: number = 0) {
    //   const grips = [
    //     PaperUtil.createGrip(this.p1, 1),
    //     PaperUtil.createGrip(this.p2, 2),
    //   ];
    //   const grip = grips.find(g => g.data === selectedGripId);
    //   if (grip) {
    //     grip.fillColor = configuration.gripDragFillColor;
    //   }
    //   return grips;
    // }
  }

  createPaperItem(name: string | undefined = undefined): Paper.Group {
    const group = new Paper.Group();
    group.data = this.id;
    group.name = ItemName.itemGroup;

    if (name) {
      group.name = name;
    }

    const childItems = this.children.map(c => c.createPaperItem());
    group.addChildren(childItems);

    return group;
  }
}

export default GraphicGroup;
