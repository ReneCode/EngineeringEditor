import { IdType } from "../types";

class DtoElement {
  projectId: IdType;
  type: string;
  name: string;
  content: string;
  id: IdType;

  // this could be zipped later
  static encodeJson = (json: object): string => {
    return JSON.stringify(json);
  };

  static decodeJson = (str: string): any => {
    return JSON.parse(str);
  };

  constructor(
    projectId: IdType,
    type: string,
    name: string,
    content: string,
    id: IdType = "",
  ) {
    this.projectId = projectId;
    this.type = type;
    this.name = name;
    this.content = content;
    this.id = id;
  }
}

export default DtoElement;
