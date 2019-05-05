import Placement from "../model/Placement";
import Paper from "paper";
import ResizeBox from "./interaction/ResizeBox";
import ResizeShape from "./interaction/ResizeShape";

export type ItemMetaData = {
  placement: Placement;
  resizeBox?: ResizeBox | undefined;
  rev: number;
};

export enum ItemName {
  resizeBox = "resizeBox",
  resizeHandle = "resizeHandle",
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
  const resizeBox = new ResizeBox(item);
  const metaData = itemGetMetaData(item);
  if (metaData) {
    metaData.resizeBox = resizeBox;
  }
};

export const itemUnselect = (item: Paper.Item) => {
  const metaData = itemGetMetaData(item);
  if (metaData && metaData.resizeBox) {
    metaData.resizeBox.remove();
    metaData.resizeBox = undefined;
  }
};
