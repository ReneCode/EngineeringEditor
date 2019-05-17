import Paper from "paper";
import { ItemName } from "../common/ItemMetaData";
import { makeArray } from "../model/dtoUtil";

class PaperUtil {
  static PointAsJSON(pt: Paper.Point): any {
    return { x: pt.x, y: pt.y };
  }
  static PointFromJSON(json: any): Paper.Point {
    return new Paper.Point(json.x, json.y);
  }

  static hitTestOptions: Paper.IHitTestOptions = {
    tolerance: 4,
    segments: true,
    stroke: true,
    fill: true,
  };

  static hitTest(point: Paper.Point): Paper.HitResult {
    const hitTestOptions: Paper.IHitTestOptions = {
      tolerance: 4,
      segments: true,
      stroke: true,
      fill: true,
    };

    const project = Paper.project;
    const result = project.hitTest(point, hitTestOptions);
    return result;
  }

  static getHitTestItem(
    result: Paper.HitResult,
    itemName: string | string[],
  ): Paper.Item | null {
    if (result && result.item) {
      const itemNames = makeArray(itemName);
      for (let name of itemNames) {
        if (ItemName.match(name, result.item.name)) {
          return result.item;
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
}

export default PaperUtil;
