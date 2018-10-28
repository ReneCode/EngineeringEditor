class BaseItem {
  constructor(pageId, type) {
    this.pageId = pageId;
    this.type = type;
    this.items = [];
  }

  translate(pt) {
    return this;
  }
}

export default BaseItem;
