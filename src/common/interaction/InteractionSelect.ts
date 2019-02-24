import InteractionBase, {
  InteractionContext,
} from "./InteractionBase";

import Paper, { IHitTestOptions, Key } from "paper";
import Placement from "../../model/Placement";

class InteractionSelect extends InteractionBase {
  items: Paper.Item[] = [];
  tempItem: Paper.Item = new Paper.Item();
  hitTestOptions: IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
  };

  constructor(context: InteractionContext) {
    super(context);
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    const project = Paper.project;
    const result = project.hitTest(event.point, this.hitTestOptions);
    if (result) {
      console.log(event.modifiers);
      const item = result.item;
      if (event.modifiers.shift) {
        this.items.push(item);
      } else {
        project.deselectAll();
        this.items = [item];
      }
      item.selected = true;
    } else {
      project.deselectAll();
      this.items = [];
    }
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    const result = Paper.project.hitTest(
      event.point,
      this.hitTestOptions,
    );
    if (this.tempItem.data instanceof Placement) {
      this.tempItem.data.paperSetStyle(this.tempItem);
    }
    if (result && result.item) {
      this.tempItem = result.item;
      this.tempItem.strokeColor = "#b2b";
      this.tempItem.strokeWidth = 3;
    }
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    this.items.forEach(i => {
      i.position = event.point;
    });
  };
}

export default InteractionSelect;
