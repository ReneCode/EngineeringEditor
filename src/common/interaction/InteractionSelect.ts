import InteractionBase, {
  InteractionContext,
} from "./InteractionBase";

import Paper, { IHitTestOptions, Key, HitResult } from "paper";
import Placement from "../../model/Placement";
import { updateElementAction } from "../../actions/createElement";
import Point from "../point";
import GraphicLine from "../../model/graphic/GraphicLine";
import deepClone from "../deepClone";

class InteractionSelect extends InteractionBase {
  change: null | "moved" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  items: Paper.Item[] = [];
  tempItem: Paper.Item = new Paper.Item();
  segments: Paper.Segment[] = [];
  hitTestOptions: IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
    handles: true,
  };

  constructor(context: InteractionContext) {
    super(context);
  }

  onMouseDown = (event: Paper.MouseEvent) => {
    const project = Paper.project;

    if (this.items.length > 0) {
      // check hit on resize-handle  (segments) ?
      let results: HitResult[] = [];
      // only check on the selected items
      this.items.forEach(i => {
        results = results.concat(
          i.hitTestAll(event.point, {
            segments: true,
            tolerance: this.hitTestOptions.tolerance,
          }),
        );
      });
      if (results.length > 0) {
        this.segments = results.map(r => r.segment);
        return;
      } else {
        this.segments = [];
      }
    }

    // item select
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
    // reset style from current tempItem
    if (this.tempItem.data instanceof Placement) {
      this.tempItem.data.paperSetStyle(this.tempItem);
    }
    if (result && result.item) {
      this.tempItem = result.item;
      this.tempItem.strokeColor = "#b2b";
      this.tempItem.strokeWidth = 2;
    }
  };

  onMouseDrag = (event: Paper.MouseEvent) => {
    if (this.segments.length > 0) {
      // resize
      this.segments.forEach(s => {
        s.point.x = s.point.x + event.delta.x;
        s.point.y = s.point.y + event.delta.y;
      });
      this.change = "resize";
      return;
    }

    this.items.forEach(i => {
      i.position = i.position.add(event.delta);
    });
    this.change = "moved";
  };

  onMouseUp = async (event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    if (this.change === "resize") {
      placements = this.segments.map(segment => {
        const path = segment.path;
        const points = path.segments.map(s => {
          return new Point(s.point.x, s.point.y);
        });
        const placement = path.data as Placement;
        return placement.changeAfterResize(points);
      });
      return;
    }

    if (this.change === "moved") {
      const paperDelta = event.point.subtract(this.firstPoint);
      const completeDelta = new Point(paperDelta.x, paperDelta.y);
      placements = this.items.map(i => {
        const placement: Placement = i.data;
        return placement.translate(completeDelta);
      });
    }

    this.change = null;
    if (placements.length > 0) {
      await this.context.dispatch(
        updateElementAction("placement", placements),
      );
    }
  };
}

export default InteractionSelect;
