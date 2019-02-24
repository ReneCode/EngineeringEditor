import InteractionBase from "./InteractionBase";

import Paper from "paper";

class InteractionSelect extends InteractionBase {
  items: Paper.Item[] = [];

  onMouseDown = (event: Paper.MouseEvent) => {
    const project = Paper.project;
    const result = project.hitTest(event.point);
    if (result) {
      console.log(result.type);
      const item = result.item;
      this.items.push(item);
      item.selected = true;
    } else {
      project.deselectAll();
      this.items = [];
    }
  };

  // onMouseMove = (event: Paper.MouseEvent) => {
  //   Paper.project.activeLayer.selected = false;
  //   if (event.item) {
  //     event.item.selected = true;
  //   }
  // };

  onMouseDrag = (event: Paper.MouseEvent) => {
    this.items.forEach(i => {
      i.position = event.point;
    });
  };
}

export default InteractionSelect;
