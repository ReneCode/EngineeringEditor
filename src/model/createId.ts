import UUID from "uuid/v4";

function createId(prefix: string = ""): string {
  let id = UUID();
  // 109156be-c4fb-41ea-b1b4-efe1671c5836

  return prefix + id; // .replace(/-/g, "");
}

export default createId;
