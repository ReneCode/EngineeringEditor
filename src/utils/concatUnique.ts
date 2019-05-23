function concatUnique<T>(arr: T[], item: T): T[] {
  const exists = arr.find(i => i === item);
  if (exists) {
    return arr;
  }
  return arr.concat(item);
}

export { concatUnique };
