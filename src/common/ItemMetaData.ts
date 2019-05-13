import Placement from "../model/Placement";
import Paper from "paper";
import ResizeBox from "./interaction/ResizeBox";
import ResizeShape from "./interaction/ResizeShape";
import { match } from "minimatch";

export type ItemMetaData = {
  placement: Placement;
  resizeBox?: ResizeBox | undefined;
  rev: number;
};

export class ItemName {
  static resizeBox = "resizeBox";
  static resizeHandle = "resizeHandle";

  static itemAny = ".";
  static itemArc = ".arc";
  static itemLine = ".line";

  static match(test: string, found: string | null) {
    // if (test === ".") return true;
    if (!test) {
      // old data
      return true;
    }

    if (test && found === test) {
      return true;
    }
    if (
      found &&
      test === ItemName.itemAny &&
      found[0] === ItemName.itemAny
    ) {
      return true;
    }
    return false;
  }
}

export const itemGetMetaData = (
  item: Paper.Item,
): ItemMetaData | null => {
  if (!item) {
    return null;
  }
  const metaData = item.data as ItemMetaData;
  if (!metaData) {
    return null;
    // throw new Error(`MetaData missing on item:"${item}`);
  }
  return metaData;
};

export const itemIncRev = (item: Paper.Item) => {
  const metaData = item.data as ItemMetaData;
  if (!metaData) {
    throw new Error(`MetaData missing on item:"${item}`);
  }
  metaData.rev++;
};

export const itemSelect = (item: Paper.Item) => {
  // const resizeBox = new ResizeBox(item);
  // const metaData = itemGetMetaData(item);
  // if (metaData) {
  //   metaData.resizeBox = resizeBox;
  // }
};

export const itemUnselect = (item: Paper.Item) => {
  const metaData = itemGetMetaData(item);
  if (metaData && metaData.resizeBox) {
    metaData.resizeBox.remove();
    metaData.resizeBox = undefined;
  }
};
