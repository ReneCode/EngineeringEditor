import Paper from "paper";
import { ItemName } from "../common/ItemMetaData";
import { makeArray } from "../model/dtoUtil";
import configuration from "../common/configuration";
import Placement from "../model/Placement";
import store from "../store/index";
import { IGlobalState } from "../reducers";

class PaperUtil {
  static setup(canvas: HTMLCanvasElement) {
    Paper.setup(canvas);
    Paper.settings.handleSize = 8;
  }

  // static activateLayer(name: "temp" | "default" | null): Paper.Layer {
  //   const project = Paper.project;
  //   const prevLayer = project.activeLayer;
  //   switch (name) {
  //     case null:
  //     case "default":
  //       project.layers[0].activate();
  //       break;
  //     case "temp":
  //       project.layers[1].activate();
  //       break;
  //     default:
  //       throw new Error("bad layer name:" + name);
  //   }
  //   return prevLayer;
  // }

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

  static createGrip(
    pt: Paper.Point,
    id: number,
    type: "circle" | "rect" = "circle",
  ): Paper.Item {
    const radius = 6;

    let grip: Paper.Item;
    if (type === "circle") {
      grip = new Paper.Path.Circle(pt, radius);
    } else {
      const rect = new Paper.Rectangle(
        pt.subtract(radius),
        pt.add(radius),
      );
      grip = new Paper.Path.Rectangle(rect);
    }

    grip.fillColor = configuration.gripFillColor;
    grip.strokeColor = configuration.gripStrokeColor;
    grip.name = ItemName.grip;
    grip.data = id;
    return grip;
  }

  static getPlacementsById(ids: string[]): Placement[] {
    let placements: Placement[] = [];
    const state: IGlobalState = store.getState();
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
}

export default PaperUtil;
