import { IdType, GraphicType } from "./types";

export interface DtoPlacement {
  id: IdType;
  type: GraphicType;
  projectId: IdType;
  pageId: IdType;
  content: string;
}

export interface DtoElement {
  id: IdType;
  type: GraphicType;
  projectId: IdType;
  name: string;
  content: string;
}

// this could be zipped / crypted later
export const encodeJson = (json: object): string => {
  return JSON.stringify(json);
};

export const decodeJson = (str: string): any => {
  return JSON.parse(str);
};
