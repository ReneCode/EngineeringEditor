class BaseItem {
  constructor(type) {
    this.type = type;
    this.items = [];
  }

  translate(pt) {
    return this;
  }
}

export default BaseItem;
