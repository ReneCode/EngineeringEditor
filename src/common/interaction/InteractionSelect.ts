import InteractionBase, {
  InteractionContext,
} from "./InteractionBase";

import Paper, { IHitTestOptions, HitResult } from "paper";
import Placement from "../../model/Placement";
import { updateElementAction } from "../../actions/createElement";
import Point from "../point";
import ResizeBox from "./ResizeBox";
import { itemGetMetaData } from "../ItemMetaData";

class InteractionSelect extends InteractionBase {
  change: null | "moving" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  items: Paper.Item[] = [];
  tempItem: Paper.Item = new Paper.Item();
  segments: Paper.Segment[] = [];
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
        this.selectItem(item);
      }
    } else {
      // replace selection
      this.deselectAll();
      if (result && result.item) {
        const item = result.item;
        this.selectItem(item);
      }
    }
  };

  onMouseMove = (event: Paper.MouseEvent) => {
    const result = Paper.project.hitTest(
      event.point,
      this.hitTestOptions,
    );
    // reset style from current tempItem
    const metaData = itemGetMetaData(this.tempItem);
    if (metaData.placement) {
      metaData.placement.paperSetStyle(this.tempItem);
    }
    if (result && result.item && result.item.name != "bbox") {
      console.log(":", result.item.className);
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

    this.items.forEach(item => {
      item.position = item.position.add(event.delta);
      const metaData = itemGetMetaData(item);
      if (metaData.resizeBox) {
        metaData.resizeBox.position = metaData.resizeBox.position.add(
          event.delta,
        );
      }
    });
    this.change = "moving";
  };

  onMouseUp = async (event: Paper.MouseEvent) => {
    let placements: Placement[] = [];

    if (this.change === "resize") {
      placements = this.segments.map(segment => {
        const path = segment.path;
        const points = path.segments.map(s => {
          return new Point(s.point.x, s.point.y);
        });
        const metaData = itemGetMetaData(path);
        return metaData.placement.changeAfterResize(points);
      });
      return;
    }

    if (this.change === "moving") {
      const paperDelta = event.point.subtract(this.firstPoint);
      const completeDelta = new Point(paperDelta.x, paperDelta.y);
      placements = this.items.map(item => {
        const metaData = itemGetMetaData(item);
        return metaData.placement.translate(completeDelta);
      });
    }

    this.change = null;
    if (placements.length > 0) {
      await this.context.dispatch(
        updateElementAction("placement", placements),
      );
    }
  };

  deselectAll() {
    this.items.forEach(item => {
      const metaData = itemGetMetaData(item);
      if (metaData.resizeBox) {
        metaData.resizeBox.remove();
        metaData.resizeBox = undefined;
      }
    });
    this.items = [];
  }

  selectItem(item: Paper.Item) {
    if (this.items.includes(item)) {
      return;
    }
    this.items.push(item);

    const resizeBox = ResizeBox.create(item);
    const metaData = itemGetMetaData(item);
    metaData.resizeBox = resizeBox;
  }
}

export default InteractionSelect;
