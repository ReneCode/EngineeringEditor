import Placement from "../model/Placement";
import Paper from "paper";

export type ItemMetaData = {
  placement: Placement;
  resizeBox?: Paper.Item | undefined;
  rev: number;
};

export const itemGetMetaData = (item: Paper.Item) => {
  const metaData = item.data as ItemMetaData;
  if (!metaData) {
    throw new Error(`MetaData missing on item:"${item}`);
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
