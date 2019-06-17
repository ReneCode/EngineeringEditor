export class ItemName {
  static handle = "handle";
  static grip = "grip";
  static temp = "temp";

  static itemAny = ".";
  static itemArc = ".arc";
  static itemLine = ".line";
  static itemText = ".text";
  static itemGroup = ".group";
  static itemSymbolRef = ".symref";
  static itemConnectionPoint = ".conPt";

  static match(test: string, found: string | null) {
    if (!test) {
      // old data
      return true;
    }

    if (test && found === test) {
      return true;
    }
    if (
      found &&
      test === ItemName.itemAny &&
      found[0] === ItemName.itemAny
    ) {
      return true;
    }
    return false;
  }
}
