import InteractionBase, {
  InteractionContext,
} from "./InteractionBase";

import Paper, { IHitTestOptions, Key } from "paper";
import Placement from "../../model/Placement";
import { updateElementAction } from "../../actions/createElement";
import Point from "../point";

class InteractionSelect extends InteractionBase {
  moved: boolean = false;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
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
    this.firstPoint = event.point;

    if (event.modifiers.shift) {
      // add to selection
      if (result && result.item) {
        const item = result.item;
        item.selected = true;
        if (!this.items.includes(item)) {
          this.items.push(item);
        }
      }
    } else {
      // replace selection
      project.deselectAll();
      if (result && result.item) {
        const item = result.item;
        item.selected = true;
        this.items = [item];
      } else {
        this.items = [];
      }
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
    this.moved = true;
    this.items.forEach(i => {
      i.position = i.position.add(event.delta);
    });
  };

  onMouseUp = async (event: Paper.MouseEvent) => {
    if (this.moved) {
      this.moved = false;
      const paperDelta = event.point.subtract(this.firstPoint);
      const delta = new Point(paperDelta.x, paperDelta.y);
      const placements: Placement[] = this.items.map(i => {
        const placement: Placement = i.data;
        return placement.translate(delta);
      });

      await this.context.dispatch(
        updateElementAction("placement", placements),
      );
    }
  };
}

export default InteractionSelect;
