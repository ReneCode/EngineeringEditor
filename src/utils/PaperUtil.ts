import Paper from "paper";
import { ItemName } from "../common/ItemName";
import { makeArray } from "../model/dtoUtil";
import configuration from "../common/configuration";
import Placement from "../model/Placement";
import store from "../store/index";
import { setSelectedPlacementIds } from "../actions/graphicActions";

export const TRANSPARENT_COLOR = "#00000000";

export type HitTestResult = {
  itemHit: Paper.Item;
  itemResult: Paper.Item;
};

class PaperUtil {
  static setup(canvas: HTMLCanvasElement) {
    Paper.setup(canvas);
    Paper.settings.handleSize = 8;
  }

  static PointToJSON(pt: Paper.Point): any {
    if (!pt) {
      return { x: 0, y: 0 };
    }
    return { x: pt.x, y: pt.y };
  }
  static PointFromJSON(json: any): Paper.Point {
    if (!json) {
      return new Paper.Point(0, 0);
    }
    return new Paper.Point(json.x, json.y);
  }

  static hitTestOptions: Paper.IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
  };

  static hitTest(point: Paper.Point): Paper.HitResult | null {
    const hitTestOptions: Paper.IHitTestOptions = {
      tolerance: 4,
      segments: true,
      stroke: true,
      fill: true,
      match: function(result: Paper.HitResult) {
        if (
          result &&
          result.item &&
          result.item.name === ItemName.temp
        ) {
          return false;
        }
        return true;
      },
    };

    const project = Paper.project;
    const result = project.hitTest(point, hitTestOptions);
    return result;
    // const results = project.hitTestAll(point, hitTestOptions);
    // console.log(":", results);
    // if (results) {
    //   return results[0];
    // }
    // return null;
  }

  static getHitTestItem(
    result: Paper.HitResult,
    itemName: string | string[],
  ): HitTestResult | null {
    if (result && result.item) {
      let item = result.item;
      const itemHit = item;

      // symbolRef with PropText
      // => the top-element is a group (parent of the placedSymbol)
      if (item instanceof Paper.PlacedSymbol) {
        if (!(item.parent instanceof Paper.Layer)) {
          item = item.parent;
        }
      }

      // get the top most group
      while (item.parent && item.parent.name === ItemName.itemGroup) {
        item = item.parent;
      }
      const itemNames = makeArray(itemName);
      for (let name of itemNames) {
        if (ItemName.match(name, item.name)) {
          return {
            itemHit,
            itemResult: item,
          };
        }
      }
    }
    return null;
  }

  static includeWithSameData(
    items: Paper.Item[],
    item: Paper.Item,
  ): boolean {
    const found = items.find(i => i.data === item.data);
    if (found) {
      return true;
    }
    return false;
  }

  static createGrip(pt: Paper.Point, id: number): Paper.Item {
    const radius = PaperUtil.lengthViewToProject(
      configuration.gripRadius,
    );
    const grip = new Paper.Path.Circle(pt, radius);

    grip.fillColor = configuration.gripFillColor;
    grip.strokeColor = configuration.gripStrokeColor;
    grip.name = ItemName.grip;
    grip.data = id;
    return grip;
  }

  static getPlacementsById(ids: string[]): Placement[] {
    if (!ids) {
      throw new Error("ids not set");
    }
    let placements: Placement[] = [];
    const state = store.getState();
    for (let id of ids) {
      const placement = state.graphic.items.find(
        placement => placement.id === id,
      );
      if (placement) {
        placements.push(placement);
      }
    }
    return placements;
  }

  static setSelectedPlacementIds(ids: string[]) {
    store.dispatch(setSelectedPlacementIds([]));
  }

  static getSelectedPlacementIds() {
    const state = store.getState();
    return state.graphic.selectedPlacementIds;
  }

  static createBoundingBox(items: Paper.Item[]): Paper.Rectangle {
    if (items.length === 0) {
      throw new Error("can't create bounding box of nothing");
    }
    let bbox = items[0].bounds;
    for (let item of items) {
      bbox = bbox.unite(item.bounds);
    }
    return bbox;
  }

  static getRemovedStrings(before: string[], after: string[]) {
    const removed: string[] = [];
    for (let s of before) {
      if (!after.includes(s)) {
        removed.push(s);
      }
    }
    return removed;
  }

  static getAddedStrings(before: string[], after: string[]) {
    const added: string[] = [];
    for (let s of after) {
      if (!before.includes(s)) {
        added.push(s);
      }
    }
    return added;
  }

  static lengthViewToProject(len: number) {
    const p0 = Paper.view.viewToProject(new Paper.Point(0, 0));
    const p1 = Paper.view.viewToProject(new Paper.Point(0, len));

    return p1.subtract(p0).length;
  }
}

export default PaperUtil;
