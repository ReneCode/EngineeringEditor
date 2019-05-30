import { IdType } from "./types";

class Page {
  id: string = "";
  projectId: string = "";
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export default Page;
