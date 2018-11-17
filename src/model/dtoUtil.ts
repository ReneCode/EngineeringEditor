import { IdType, GraphicType } from "./types";

export interface DtoPlacement {
  projectId: IdType;
  pageId: IdType;
  id: IdType;
  type: GraphicType;
  graphic: string;
}

export interface DtoElement {
  projectId: IdType;
  type: GraphicType;
  name: string;
  content: string;
  id: IdType;
}

// this could be zipped / crypted later
export const encodeJson = (json: object): string => {
  return JSON.stringify(json);
};

export const decodeJson = (str: string): any => {
  return JSON.parse(str);
};
