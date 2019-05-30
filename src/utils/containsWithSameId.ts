import Placement from "../model/Placement";

const containsWithSameId = (items: Placement[], item: Placement) => {
  return items.findIndex(i => i.id === item.id) >= 0;
};

export default containsWithSameId;
