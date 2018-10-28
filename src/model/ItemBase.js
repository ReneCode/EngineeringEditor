class BaseItem {
  constructor(type) {
    this.type = type;
  }

  translate(pt) {
    return this;
  }
}

export default BaseItem;
