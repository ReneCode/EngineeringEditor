import Paper from "paper";

class GlobalStore {
  editBoundingBox: Paper.Rectangle | null = null;
}

const globalStore = new GlobalStore();

export default globalStore;
