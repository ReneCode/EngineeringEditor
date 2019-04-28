import InteractionBase, {
  InteractionContext,
} from "./InteractionBase";

import Paper, { IHitTestOptions, HitResult } from "paper";
import Placement from "../../model/Placement";
import { updateElementAction } from "../../actions/createElement";
import Point from "../point";
import ResizeBox from "./ResizeBox";
import { itemGetMetaData } from "../ItemMetaData";
import { containsWithSameId } from "../../reducers/graphicReducer";

class InteractionSelect extends InteractionBase {
  change: null | "moving" | "resize" = null;
  firstPoint: Paper.Point = new Paper.Point(0, 0);
  selectedItems: Paper.Item[] = [];
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

    // reset style from current tempItem
    const metaData = itemGetMetaData(this.tempItem);
    if (metaData.placement) {
      metaData.placement.paperSetStyle(this.tempItem);
    }

    if (this.selectedItems.length > 0) {
      // check hit on resize-handle  (segments) ?
      let results: HitResult[] = [];
      // only check on the selected items
      this.selectedItems.forEach(item => {
        results = results.concat(
          item.hitTestAll(event.point, {
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

    const hitItem = this.getHitItem(result);
    if (hitItem) {
      this.tempItem = hitItem;
      this.tempItem.strokeColor = "#b2b";
      this.tempItem.strokeWidth = 2;
    }

    const hitHandle = this.getHitHandleItem(result);
    if (hitHandle) {
      hitHandle.fillColor = "red";
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

    this.selectedItems.forEach(item => {
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
      placements = this.selectedItems.map(item => {
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
    this.selectedItems.forEach(item => {
      const metaData = itemGetMetaData(item);
      if (metaData.resizeBox) {
        metaData.resizeBox.remove();
        metaData.resizeBox = undefined;
      }
    });
    this.selectedItems = [];
  }

  selectItem(item: Paper.Item) {
    if (this.selectedItems.includes(item)) {
      return;
    }
    this.selectedItems.push(item);

    const resizeBox = ResizeBox.create(item);
    const metaData = itemGetMetaData(item);
    metaData.resizeBox = resizeBox;
  }

  private getHitItem(result: any): Paper.Item | null {
    // do not mark a selected item
    let canSelect = false;
    if (
      result &&
      result.item &&
      result.item.name != "bbox" &&
      result.item.name != "handle"
    ) {
      canSelect = true;
      if (this.selectedItems.find(i => i === result.item)) {
        canSelect = false;
      }
    }
    if (canSelect) {
      return result.item;
    }
    return null;
  }

  private getHitHandleItem(result: any): Paper.Item | undefined {
    let foundHandle = undefined;
    if (result && result.item) {
      const testItem = result.item;
      this.selectedItems.find(item => {
        const metaData = itemGetMetaData(item);
        if (metaData.resizeBox) {
          const group = metaData.resizeBox;
          const found = group.children.find(
            i => i.name === "handle" && i == testItem,
          );
          if (found) {
            foundHandle = found;
          }
          return found !== undefined;
        }
        return false;
      });
    }
    return foundHandle;
  }
}

export default InteractionSelect;
