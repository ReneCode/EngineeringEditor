import { IdType } from "./types";

class Page {
  id: IdType;
  projectId: IdType;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export default Page;
