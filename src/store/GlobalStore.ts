import Paper from "paper";
import Placement from "../model/Placement";

class GlobalStore {
  editBoundingBox: Paper.Rectangle | null = null;

  placements: Placement[] = [];
}

const globalStore = new GlobalStore();

export default globalStore;
