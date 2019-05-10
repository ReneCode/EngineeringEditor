import Paper from "paper";
import Placement from "../Placement";

class PaperPlacement extends Placement {
  constructor(private paperItem: Paper.Item) {
    super("#paper");
  }

  toJsonContent = () => {
    return this.paperItem.exportJSON({ asString: false });
  };

  paperDraw() {
    const item = new Paper.Path();
    item.replaceWith(this.paperItem);
    return item;
  }
}

export default PaperPlacement;
