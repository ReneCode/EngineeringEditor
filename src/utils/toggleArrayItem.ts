const toggleArrayItem = (arr: any[], item: any): any[] => {
  const reducedArray = arr.filter(i => i !== item);
  if (reducedArray.length < arr.length) {
    return reducedArray;
  }
  return arr.concat(item);
};

export default toggleArrayItem;
